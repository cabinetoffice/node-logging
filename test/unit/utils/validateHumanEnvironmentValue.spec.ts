import { describe, test, expect } from '@jest/globals';

import { validateHumanEnvironmentValue } from '../../../src/utils/validateHumanEnvironmentValue';

describe('validateLevelHumanValue test suits', () => {
    test('If the human value is the string true, return true', () => {
        const trueValue = 'true';
        const humanValue = validateHumanEnvironmentValue(trueValue);

        expect(humanValue).toEqual(true);
    });

    test('If the human value is not the string true, return false', () => {
        const randomValue = 'some value';
        const humanValue = validateHumanEnvironmentValue(randomValue);

        expect(humanValue).toEqual(false);
    });

    test('If the level value is the string true but not lowercase, return true', () => {
        const uppercaseTrueValue = 'TRUE';
        const humanValue = validateHumanEnvironmentValue(uppercaseTrueValue);

        expect(humanValue).toEqual(true);
    });
});
