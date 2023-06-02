type SettingsMetadata = {
    categories: string[];
    version: string;
    firstTime: boolean;
}

type SelectSetting = {
    name: string;
    description?: string;
    category: string;
    type: 'select';
    options: string[];
    value: string;
}
type BoolSetting = {
    name: string;
    description?: string;
    category: string;
    type: 'bool';
    value: boolean;
}
type CodeSetting = {
    name: string;
    description?: string;
    category: string;
    type: 'code';
    language: string;
    value: string;
}
type SettingValue = SelectSetting | BoolSetting | CodeSetting;

type AppSettings = {
    metadata: SettingsMetadata;
    values: {[key: string]: SettingValue};
}

export { SettingsMetadata, SettingValue, AppSettings };