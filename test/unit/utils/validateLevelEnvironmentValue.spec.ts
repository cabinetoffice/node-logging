import { describe, test, expect } from '@jest/globals';

import { validateLevelEnvironmentValue } from '../../../src/utils/validateLevelEnvironmentValue';

describe('validateEnvironmentValue test suits', () => {
    test('If the level value is valid, return the level value', () => {
        const validLevelValue = 'debug';
        const levelValue = validateLevelEnvironmentValue(validLevelValue);

        expect(levelValue).toEqual('debug');
    });

    test('If the level value is invalid, return the default level value', () => {
        const invalidLevelValue = 'some value';
        const levelValue = validateLevelEnvironmentValue(invalidLevelValue);

        expect(levelValue).toEqual('info');
    });

    test('If the level value is valid but not lowercase, returns the level value', () => {
        const uppercaseLevelValue = 'ERROR';
        const levelValue = validateLevelEnvironmentValue(uppercaseLevelValue);

        expect(levelValue).toEqual('error');
    });
});
