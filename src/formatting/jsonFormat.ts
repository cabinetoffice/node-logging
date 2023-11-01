import { DateTime } from 'luxon';
import { TransformableInfo } from 'logform';
import { createdDateFormat } from '../config/createdDataFormat';
import winston from 'winston';

export const setJsonMessage = (namespace: string, info: TransformableInfo) => {
    return {
        created: DateTime.now().toFormat(createdDateFormat),
        event: info.level,
        namespace: namespace,
        context: info.context,
        data: {
            message: info.message,
            path: info.path,
            method: info.method,
            status: info.status,
            duration: info.duration
        }
    };
};

export const createJsonFormat = (namespace: string) => {
    return winston.format.printf((info: TransformableInfo) => JSON.stringify(setJsonMessage(namespace, info)));
};
