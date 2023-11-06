jest.mock('../../src/utils/getRequestData');

import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { getRequestData } from '../../src/utils/getRequestData';
import { MOCK_REQUEST, MOCK_LOGGER } from '../mock/data.mock';
import { ApplicationLogger } from '../../src/ApplicationLogger';

const mockGetRequestDataCall = getRequestData as jest.Mock;

describe('ApplicationLogger test suites', () => {
    let applicationLogger: ApplicationLogger;

    beforeEach(() => {
        applicationLogger = new ApplicationLogger(MOCK_LOGGER);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should log debug message', () => {
        applicationLogger.debug('Debug message');

        expect(MOCK_LOGGER.debug).toHaveBeenCalledWith('Debug message');
    });

    test('Should log info message', () => {
        applicationLogger.info('Info message');

        expect(MOCK_LOGGER.info).toHaveBeenCalledWith('Info message');
    });

    test('Should log error message', () => {
        applicationLogger.error('Error message');

        expect(MOCK_LOGGER.error).toHaveBeenCalledWith('Error message');
    });

    test('should log debug message with request data', () => {
        applicationLogger.debugRequest(MOCK_REQUEST, 'Debug message with request data');

        expect(mockGetRequestDataCall).toHaveBeenCalledTimes(1);
        expect(MOCK_LOGGER.debug).toHaveBeenCalledWith(
            'Debug message with request data',
            mockGetRequestDataCall(MOCK_REQUEST)
        );
    });

    test('should log info message with request data', () => {
        applicationLogger.infoRequest(MOCK_REQUEST, 'Info message with request data');

        expect(mockGetRequestDataCall).toHaveBeenCalledTimes(1);
        expect(MOCK_LOGGER.info).toHaveBeenCalledWith(
            'Info message with request data',
            mockGetRequestDataCall(MOCK_REQUEST)
        );
    });

    test('should log error message with request data', () => {
        applicationLogger.errorRequest(MOCK_REQUEST, 'Error message with request data');

        expect(mockGetRequestDataCall).toHaveBeenCalledTimes(1);
        expect(MOCK_LOGGER.error).toHaveBeenCalledWith(
            'Error message with request data',
            mockGetRequestDataCall(MOCK_REQUEST)
        );
    });
});
