import { ipcRenderer } from 'electron';

export function addWindowEventListener (listener: (event: string) => void) {
    ipcRenderer.on('windowEvent', (event, arg: string) => {
        listener(arg);
    });
}