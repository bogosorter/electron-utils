export type CommonMetadata = {
    labels: string[];
    version: string;
    firstTime: boolean;
}

export type SelectSetting = {
    name: string;
    description?: string;
    label: string;
    type: 'select';
    options: string[];
    value: string;
}
export type BoolSetting = {
    name: string;
    description?: string;
    label: string;
    type: 'bool';
    value: boolean;
}
export type CodeSetting = {
    name: string;
    description?: string;
    label: string;
    type: 'code';
    language: string;
    value: string;
}

export type Setting = SelectSetting | BoolSetting | CodeSetting;

export type CommonSettingValues = {
    theme: SelectSetting;
    zoom: SelectSetting;
    foldButton: BoolSetting;
    customCSS: CodeSetting;
}

export type GenericSettings<T> = {
    metadata: CommonMetadata;
    values: CommonSettingValues & T;
}