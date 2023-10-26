export const validateLevelEnvironmentValue = (value: string): string => {
    const validLevels = ['error', 'info', 'debug'];
    const defaultLevelValue = 'info';
    const normalisedValue = value.toLowerCase();

    return validLevels.includes(normalisedValue) ? normalisedValue : defaultLevelValue;
};
