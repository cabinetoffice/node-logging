import { LogMetaData } from 'types';
import { DateTime } from 'luxon';
import { TransformableInfo } from 'logform';
import { createdDateFormat } from '../config/createdDataFormat';
import winston from 'winston';

export const setHumanMessage = (namespace: string, info: TransformableInfo): LogMetaData => {
    return {
        message: info.message,
        created: DateTime.now().toFormat(createdDateFormat),
        namespace: namespace,
        event: info.level,
        path: info.path,
        method: info.method,
        status: info.status,
        duration: info.duration
    };
};

export const formatHumanMessage = (info: TransformableInfo, namespace: string): string => {
    const humanMessage = setHumanMessage(namespace, info);
    const sortedKeys = Object.keys(humanMessage).sort();
    const colourizer = winston.format.colorize();
    const formattedColourLog = colourizer.colorize(
        humanMessage.event,
        `${humanMessage.created} ${humanMessage.event}: ${humanMessage.message}`
    );
    const formattedHumanLogs = sortedKeys.reduce((acc, key) => {
        return humanMessage[key] ? `${acc}\n -> ${key}: ${humanMessage[key]}` : acc;
    }, formattedColourLog);
    return formattedHumanLogs;
};

export const createHumanFormat = (namespace: string): winston.Logform.Format => {
    return winston.format.printf((info: TransformableInfo) => formatHumanMessage(info, namespace));
};
