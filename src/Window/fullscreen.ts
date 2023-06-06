import { ipcRenderer } from 'electron';

export default function addFullScreenListener (listener: (isFullScreen: boolean) => void) {
    ipcRenderer.on('fullscreen', (event, arg: boolean) => {
        listener(arg);
    });
}