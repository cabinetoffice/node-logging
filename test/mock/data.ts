import { LogMetaData } from '../../src/types';
import { TransformableInfo } from 'logform';
import { MOCK_NAMESPACE, MOCK_DATE } from './text.mock';
import winston from 'winston';

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

export const MOCK_FORMATTED_HUMAN_MESSAGE = `${winston.format.colorize().colorize(
    `${MOCK_HUMAN_MESSAGE.event}`,
    `${MOCK_HUMAN_MESSAGE.created} info: ${MOCK_HUMAN_MESSAGE.message}`
)}\n -> created: ${MOCK_HUMAN_MESSAGE.created}\n -> event: ${MOCK_HUMAN_MESSAGE.event}\n -> level: ${MOCK_HUMAN_MESSAGE.event}\n -> message: ${MOCK_HUMAN_MESSAGE.message}\n -> method: ${MOCK_HUMAN_MESSAGE.method}\n -> namespace: ${MOCK_HUMAN_MESSAGE.namespace}\n -> path: ${MOCK_HUMAN_MESSAGE.path}`;
