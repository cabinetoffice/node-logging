import winston, { Logger } from 'winston';

import { createHumanFormat } from './humanFormat';
import { createJsonFormat } from './jsonFormat';
import { LoggerOptions } from '../types';
import { EXPECTED_HUMAN_LOG } from '../config';

const setFormat = (options: LoggerOptions) => {
    return {
        format: options.humanReadable === EXPECTED_HUMAN_LOG ? createHumanFormat(options.namespace) : createJsonFormat(options.namespace)
    };
};

export const createFormat = (options: LoggerOptions): Logger => {
    winston.addColors(options.colours);

    return winston.createLogger({
        level: options.level,
        levels: options.levels,
        transports: [new winston.transports.Console()],
        handleExceptions: true,
        exitOnError: false,
        ...setFormat(options)
    });
};
