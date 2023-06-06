import ESettings from 'electron-settings';
import { commonMetadata, commonSettingsValues } from './commonSettings';
import { GenericSettings, Setting } from './types';


export default class Settings<T extends {[key: string]: Setting}> {

    defaultSettings: GenericSettings<T>;

    constructor(labels: string[], customSettings: T) {
        this.defaultSettings = {
            metadata: {...commonMetadata, labels: [...commonMetadata.labels, ...labels]},
            values: {...commonSettingsValues, ...customSettings}
        };
    }

    async get() {
        let definedSettings = await ESettings.get() as GenericSettings<T>;

        if (!definedSettings.metadata || definedSettings.metadata.version !== this.defaultSettings.metadata.version) {
            definedSettings.metadata.version = this.defaultSettings.metadata.version;
            definedSettings.metadata.firstTime = this.defaultSettings.metadata.firstTime;
        }

        // Ensure compatibility with older versions
        definedSettings = {...this.defaultSettings, ...definedSettings};
        
        return definedSettings;
    }

    async set(settings: GenericSettings<T>) {
        // First time is never saved as true
        settings.metadata.firstTime = false;
        await ESettings.set(settings);
    }

    async reset() {
        await ESettings.set(this.defaultSettings);
        return this.defaultSettings;
    }
}