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
