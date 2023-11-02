import { Logger } from 'winston';
import { Request } from 'express';
import { getRequestData } from './utils/getRequestData';

export class ApplicationLogger {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public debug(message: string) {
        this.logger.debug(message);
    }

    public info(message: string) {
        this.logger.info(message);
    }

    public error(message: string) {
        this.logger.error(message);
    }

    public debugRequest(request: Request, message: string) {
        this.logger.debug(message, getRequestData(request));
    }

    public infoRequest(request: Request, message: string) {
        this.logger.info(message, getRequestData(request));
    }

    public errorRequest(request: Request, message: string) {
        this.logger.error(message, getRequestData(request));
    }
}
