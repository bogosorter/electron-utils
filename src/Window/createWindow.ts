import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
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
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
          preload: app.isPackaged
              ? path.join(dirname, 'preload.js')
              : path.join(dirname, '../../.erb/dll/preload.js'),
      },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
          mainWindow.minimize();
      } else {
          mainWindow.show();
      }
  });

  mainWindow.on('closed', () => {
      mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
  });

    return mainWindow;
};
