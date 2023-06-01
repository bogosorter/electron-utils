type Metadata = {
    categories: string[];
    version: string;
    firstTime: boolean;
}

type Select = {
    name: string;
    description?: string;
    category: string;
    type: 'select';
    options: string[];
    value: string;
}
type Bool = {
    name: string;
    description?: string;
    category: string;
    type: 'bool';
    value: boolean;
}
type Code = {
    name: string;
    description?: string;
    category: string;
    type: 'code';
    language: string;
    value: string;
}
type SettingValue = Select | Bool | Code;

type AppSettings = {
    metadata: Metadata;
    values: {[key: string]: SettingValue};
}

export { Metadata, SettingValue, AppSettings };