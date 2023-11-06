import winston, { Logger } from 'winston';
import { AbstractConfigSetLevels, AbstractConfigSetColors } from 'winston/lib/winston/config';
import { LogMetaData, LoggerOptions } from '../../src/types';
import { TransformableInfo } from 'logform';
import { MOCK_NAMESPACE, MOCK_DATE } from './text.mock';
import { Request } from 'express';

export const MOCK_INFO: TransformableInfo = {
    level: 'info',
    message: 'some message',
    method: 'GET /info',
    path: '/info'
};

export const MOCK_HUMAN_MESSAGE: LogMetaData = {
    created: MOCK_DATE,
    event: MOCK_INFO.level,
    message: MOCK_INFO.message,
    method: MOCK_INFO.method,
    namespace: MOCK_NAMESPACE,
    path: MOCK_INFO.path,
    status: undefined,
    duration: undefined
};

export const MOCK_JSON_OBJECT = {
    created: MOCK_DATE,
    data: {
        duration: undefined,
        message: MOCK_INFO.message,
        method: MOCK_INFO.method,
        path: MOCK_INFO.path,
        status: undefined
    },
    event: MOCK_INFO.level,
    namespace: MOCK_NAMESPACE
};

export const MOCK_VALID_LEVEL: AbstractConfigSetLevels = {
    error: 0,
    info: 1,
    debug: 2
};

export const MOCK_COLOURS: AbstractConfigSetColors = {
    error: 'red',
    info: 'yellow',
    debug: 'green'
};

export const MOCK_LOGGER_OPTIONS: LoggerOptions = {
    humanReadable: '',
    namespace: MOCK_NAMESPACE,
    level: MOCK_INFO.level,
    levels: MOCK_VALID_LEVEL,
    colours: MOCK_COLOURS
};

export const MOCK_FORMATTED_HUMAN_MESSAGE = `${winston.format
    .colorize()
    .colorize(
        `${MOCK_HUMAN_MESSAGE.event}`,
        `${MOCK_HUMAN_MESSAGE.created} info: ${MOCK_HUMAN_MESSAGE.message}`
    )}\n -> created: ${MOCK_HUMAN_MESSAGE.created}\n -> event: ${MOCK_HUMAN_MESSAGE.event}\n -> level: ${
    MOCK_HUMAN_MESSAGE.event
}\n -> message: ${MOCK_HUMAN_MESSAGE.message}\n -> method: ${MOCK_HUMAN_MESSAGE.method}\n -> namespace: ${
    MOCK_HUMAN_MESSAGE.namespace
}\n -> path: ${MOCK_HUMAN_MESSAGE.path}`;

export const MOCK_JSON_STRINGIFIED = `"{\\"created\\":\\"${MOCK_JSON_OBJECT.created}\\",\\"data\\":{\\"message\\":\\"${MOCK_JSON_OBJECT.data.message}\\",\\"method\\":\\"${MOCK_JSON_OBJECT.data.method}\\",\\"path\\":\\"${MOCK_JSON_OBJECT.data.path}\\"},\\"event\\":\\"${MOCK_JSON_OBJECT.event}\\",\\"namespace\\":\\"${MOCK_JSON_OBJECT.namespace}\\"}"`;

export const MOCK_REQUEST = {
    params: { id: '1' },
    body: { name: 'John Smith' },
    method: 'GET',
    path: '/example'
} as unknown as Request;

export const MOCK_LOGGER = {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
} as unknown as Logger;
