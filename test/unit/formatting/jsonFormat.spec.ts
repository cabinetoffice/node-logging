import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import winston from 'winston';

import * as jsonFormat from '../../../src/formatting/jsonFormat';

import { MOCK_INFO, MOCK_JSON_OBJECT, MOCK_JSON_STRINGIFIED } from '../../mock/data.mock';
import { MOCK_DATE, MOCK_NAMESPACE } from '../../mock/text.mock';

describe('jsonFormat test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('setJsonMessage Test', () => {
        beforeEach(() => {
            jest.useFakeTimers().setSystemTime(new Date(MOCK_DATE));
        });
        afterEach(() => {
            jest.useRealTimers();
        });
        test('Should return an object matching the jsonFormat syntax', () => {
            const jsonMesssage = jsonFormat.setJsonMessage(MOCK_NAMESPACE, MOCK_INFO);

            expect(jsonMesssage).toEqual(MOCK_JSON_OBJECT);
        });
    });
    describe('createJsonFormat Test', () => {
        let spySetJsonMessage;
        let spyWinstonPrintF;
        let spyJsonString;

        beforeEach(() => {
            spyWinstonPrintF = jest
                .spyOn(winston.format, 'printf')
                .mockImplementation(() => JSON.stringify(jsonFormat.setJsonMessage(MOCK_NAMESPACE, MOCK_INFO)) as any);

            spyJsonString = jest.spyOn(JSON, 'stringify').mockImplementation(() => MOCK_JSON_STRINGIFIED as any);

            spySetJsonMessage = jest.spyOn(jsonFormat, 'setJsonMessage').mockImplementation(() => MOCK_JSON_OBJECT);
        });
        test('Should call winston printf method once', () => {
            jsonFormat.createJsonFormat(MOCK_NAMESPACE);

            expect(spyWinstonPrintF).toBeCalledTimes(1);
            expect(spyWinstonPrintF).toBeCalledWith(expect.any(Function));
        });
        test('Should call setJsonMessage once with correct parameters ', () => {
            jsonFormat.createJsonFormat(MOCK_NAMESPACE);

            expect(spySetJsonMessage).toHaveBeenCalledTimes(1);
            expect(spySetJsonMessage).toBeCalledWith(MOCK_NAMESPACE, MOCK_INFO);
        });
        test('Should call JSON stringify once with correct parameters ', () => {
            jsonFormat.createJsonFormat(MOCK_NAMESPACE);

            expect(spyJsonString).toBeCalledWith(MOCK_JSON_OBJECT);
            expect(spyJsonString).toBeCalledTimes(1);
        });
        test('Should return an object matching the jsonFormat syntax', () => {
            const jsonMessage = jsonFormat.createJsonFormat(MOCK_NAMESPACE);

            expect(jsonMessage).toEqual(MOCK_JSON_STRINGIFIED);
        });
    });
});
