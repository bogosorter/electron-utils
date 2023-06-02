import { app } from 'electron';
import ESettings from 'electron-settings';
import path from 'path';

import genericSettings from './genericSettings';
import { AppSettings, SettingValue } from './types';

const customCSSDirectory = path.join(app.getPath('userData'), 'customCSS');
const customCSSFile = path.join(customCSSDirectory, 'custom.css');

export default class Settings {

    defaultSettings: AppSettings;

    constructor(customSettings: {[key: string]: SettingValue} = {}) {
        this.defaultSettings = {...genericSettings, ...customSettings};
    }

    async get() {
        let definedSettings = await ESettings.get() as AppSettings;

        if (!definedSettings.metadata || definedSettings.metadata.version !== this.defaultSettings.metadata.version) {
            definedSettings.metadata.version = this.defaultSettings.metadata.version;
            definedSettings.metadata.firstTime = this.defaultSettings.metadata.firstTime;
        }

        // Ensure compatibility with older versions
        definedSettings = {...this.defaultSettings, ...definedSettings};
        
        return definedSettings;
    }

    async set(settings: AppSettings) {
        // First time is never saved as true
        settings.metadata.firstTime = false;
        await ESettings.set(settings);
    }

    async reset() {
        await ESettings.set(this.defaultSettings);
        return this.defaultSettings;
    }
}