export interface LogMetaData {
    [index: string]: any;
    level: string;
    message: any;
    path: string;
    method: string;
    created?: string;
    namespace?: string;
    event?: string;
    status?: number;
    duration?: number;
}
