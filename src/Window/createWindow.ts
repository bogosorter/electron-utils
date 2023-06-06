import path from 'path';
import { app, BrowserWindow, shell, ipcMain, ipcRenderer } from 'electron';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
    // tslint:disable-next-line
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
if (isDebug) {
    // tslint:disable-next-line
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer.default(
        extensions.map((name) => installer[name]),
        forceDownload
    );
};

export default async function createWindow(dirname: string) {
    if (isDebug) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        icon: path.join(RESOURCES_PATH, 'icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(dirname, 'preload.js')
                : path.join(dirname, '../../.erb/dll/preload.js'),
        },
        autoHideMenuBar: true,
        frame: false
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));
    mainWindow.setMinimumSize(800, 600);

    mainWindow.on('ready-to-show', () => {
        mainWindow?.maximize();
        mainWindow?.show();
    });

    mainWindow.on('enter-full-screen', () => {
        mainWindow?.webContents.send('windowEvent', 'enter-full-screen');
    });
    mainWindow.on('leave-full-screen', () => {
        mainWindow?.webContents.send('windowEvent', 'leave-full-screen');
    });
    mainWindow.on('maximize', () => {
        mainWindow?.webContents.send('windowEvent', 'maximize');
    });
    mainWindow.on('unmaximize', () => {
        mainWindow?.webContents.send('windowEvent', 'unmaximize');
    });
    mainWindow.on('minimize', () => {
        mainWindow?.webContents.send('windowEvent', 'minimize');
    });

    mainWindow.on('closed', () => app.quit());

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    return mainWindow;
};

ipcMain.on('window', (event, arg) => {
    if (arg === 'minimize') mainWindow?.minimize();
    else if (arg === 'maximize') mainWindow?.maximize();
    else if (arg === 'unmaximize') mainWindow?.unmaximize();
    else if (arg === 'close') mainWindow?.close();
});
