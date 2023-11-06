import { describe, test, expect } from '@jest/globals';
import { getRequestData } from '../../../src/utils/getRequestData';
import { MOCK_REQUEST } from '../../mock/data.mock';

describe('getRequestData test suites', () => {
    test('Should extract path and method properties from Request object', () => {
        const requestData = getRequestData(MOCK_REQUEST);

        expect(requestData).toMatchObject({
            path: MOCK_REQUEST.path,
            method: MOCK_REQUEST.method
        });
    });

    test('Should not return other properties which may be present on Request object', () => {
        const requestData = getRequestData(MOCK_REQUEST);

        expect(MOCK_REQUEST).toHaveProperty('body');
        expect(MOCK_REQUEST).toHaveProperty('params');
        expect(requestData).not.toHaveProperty('body');
        expect(requestData).not.toHaveProperty('params');
    });
});
