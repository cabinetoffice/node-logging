import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

export interface LogMetaData {
    [index: string]: any;
    message: any;
    path: string;
    method: string;
    event: string;
    created?: string;
    namespace?: string;
    status?: number;
    duration?: number;
}

export interface LoggerOptions {
    humanReadable: string;
    namespace: string;
    level: string;
    levels: AbstractConfigSetLevels;
    colours: AbstractConfigSetColors;
}
