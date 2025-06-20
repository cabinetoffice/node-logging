import { describe, test, expect } from '@jest/globals';

import { validateEnvironmentValue } from '../../../src/utils/validateEnvironmentValue';
import { MOCK_VALID_LEVEL } from '../../mock/data.mock';

describe('validateEnvironmentValue test suites', () => {
    const validValues = ['development', 'production'];
    test('Should return a valid value', () => {
        const validValue = 'debug';
        const validatedValue = validateEnvironmentValue(validValue, Object.keys(MOCK_VALID_LEVEL));

        expect(validatedValue).toEqual('debug');
    });
    it('should return the default if the value is invalid and default is valid', () => {
        expect(validateEnvironmentValue('invalid', validValues, 'test')).toBe('test');
    });
    it('should return "test" if allowTest is true even if not in validValues', () => {
        expect(
            validateEnvironmentValue('test', ['production', 'development'], 'development', { allowTest: true })
        ).toBe('test');
    });
    test('Should throw error if value is invalid and no default value provided', () => {
        const invalidValue = 'invalid value';

        expect(() => {
            validateEnvironmentValue(invalidValue, Object.keys(MOCK_VALID_LEVEL));
        }).toThrow();
    });

    test('Should return default value if value is invalid but default value is provided', () => {
        const invalidValue = 'invalid value';
        const defaultValue = 'info';

        const validatedValue = validateEnvironmentValue(invalidValue, Object.keys(MOCK_VALID_LEVEL), defaultValue);

        expect(validatedValue).toEqual(defaultValue);
    });

    test('Should return value if value is not lowercase but still valid', () => {
        const uppercaseValue = 'ERROR';
        const validatedValue = validateEnvironmentValue(uppercaseValue, Object.keys(MOCK_VALID_LEVEL));

        expect(validatedValue).toEqual('error');
    });
});
