export const validateHumanEnvironmentValue = (value: string): boolean => {
    const expectedValue = 'true';
    const normalisedValue = value.toLowerCase();

    return expectedValue === normalisedValue;
};
