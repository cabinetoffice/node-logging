jest.mock('../../../src/formatting/humanFormat');
jest.mock('../../../src/formatting/jsonFormat');
jest.mock('../../../src/utils/validateEnvironmentValue');

import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import winston from 'winston';

import * as indexFormat from '../../../src/formatting/index';
import { createHumanFormat } from '../../../src/formatting/humanFormat';
import { createJsonFormat } from '../../../src/formatting/jsonFormat';

import { MOCK_LOGGER_OPTIONS, MOCK_COLOURS } from '../../mock/data.mock';

const mockCreateHumanFormat = createHumanFormat as jest.Mock;
const mockCreateJsonFormat = createJsonFormat as jest.Mock;

describe('index format test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('setFormat tests', () => {
        test('Should return an createHumanFormat when HUMAN_LOG is true', () => {
            const loggerOptions = { ...MOCK_LOGGER_OPTIONS, humanReadable: 'true' };

            indexFormat.createFormat(loggerOptions);

            expect(mockCreateHumanFormat).toBeCalledTimes(1);
            expect(mockCreateJsonFormat).not.toBeCalled();
        });
        test('Should return an createJsonFormat when HUMAN_LOG is false', () => {
            const loggerOptions = { ...MOCK_LOGGER_OPTIONS, HUMAN_LOG: 'false' };

            indexFormat.createFormat(loggerOptions);

            expect(mockCreateJsonFormat).toBeCalledTimes(1);
            expect(mockCreateHumanFormat).not.toBeCalled();
        });
    });
    describe('createFormat tests', () => {
        let spyAddColours;
        let spyCreateLogger;

        beforeEach(() => {
            spyAddColours = jest.spyOn(winston, 'addColors').mockImplementation(() => MOCK_COLOURS as any);

            spyCreateLogger = jest.spyOn(winston, 'createLogger').mockImplementation(() => MOCK_LOGGER_OPTIONS as any);
        });
        test('Should check addColors is called', () => {
            indexFormat.createFormat(MOCK_LOGGER_OPTIONS);

            expect(spyAddColours).toBeCalledTimes(1);
            expect(spyAddColours).toBeCalledWith(MOCK_COLOURS);
        });
        test('Should check createLogger is called', () => {
            const logger = indexFormat.createFormat(MOCK_LOGGER_OPTIONS);

            expect(spyCreateLogger).toBeCalledTimes(1);
            expect(logger).toEqual(MOCK_LOGGER_OPTIONS);
        });
    });
});
