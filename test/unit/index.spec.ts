jest.mock('../../src/formatting/index');
jest.mock('../../src/utils/validateEnvironmentValue');

import { jest, describe, test, expect, afterEach } from '@jest/globals';
import { createLogger } from '../../src/index';
import { createFormat } from '../../src/formatting/index';
import { MOCK_NAMESPACE } from '../mock/text.mock';
import { ApplicationLogger } from '../../src/ApplicationLogger';

const mockCreateFormat = createFormat as jest.Mock;

describe('createLogger test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call createFormat once', () => {
        createLogger(MOCK_NAMESPACE);

        expect(mockCreateFormat).toHaveBeenCalledTimes(1);
    });

    test('Should create an instance of an Application Logger', () => {
        const applicationLogger = createLogger(MOCK_NAMESPACE);

        expect(applicationLogger).toBeInstanceOf(ApplicationLogger);
    });
});
