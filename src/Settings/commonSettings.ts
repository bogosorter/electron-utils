import { app } from 'electron';
import { platform } from 'os';
import { CommonMetadata, CommonSettingValues } from './types';

export const commonMetadata: CommonMetadata = {
    labels: ['Appearance'],
    version: app.getVersion(),
    firstTime: true
};

export const commonSettingsValues: CommonSettingValues = {
    theme: {
        name: 'Theme',
        label: 'Appearance',
        type: 'select',
        options: [
            'light',
            'dark'
        ],
        value: 'dark'
    },
    zoom: {
        name: 'Zoom',
        label: 'Appearance',
        type: 'select',
        options: [
            '0.7',
            '0.8',
            '0.9',
            '1',
            '1.2',
            '1.4'
        ],
        value: platform() === 'win32'? '0.8' : '1',
    },
    foldButton: {
        name: 'Fold navigation button',
        label: 'Appearance',
        description: 'This will fold the navigation buttons into a single one, which unfolds when hovered.',
        type: 'bool',
        value: false
    },
    customCSS: {
        name: 'Custom CSS',
        label: 'Appearance',
        description: 'This allows you to change the app\'s appearance. See the documentation for more information',
        type: 'code',
        language: 'css',
        value: ''
    }
};
