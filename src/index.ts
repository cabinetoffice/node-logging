import { ApplicationLogger } from './ApplicationLogger';
import { createFormat } from './formatting';
import * as config from './config';

export const createLogger = (namespace: string) => {
    return new ApplicationLogger(createFormat({ namespace, ...config }));
};
