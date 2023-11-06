import { Request } from 'express';

export const getRequestData = (request: Request) => {
    return {
        path: request.path,
        method: request.method
    };
};
