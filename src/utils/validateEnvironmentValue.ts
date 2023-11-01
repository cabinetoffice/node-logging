export const validateEnvironmentValue = (value: string, validValues: string[], defaultValue?: string | undefined) => {
    const normalisedValue = value.toLowerCase();

    if (!defaultValue && !validValues.includes(normalisedValue)) {
        throw new Error('No valid environment variable set');
    } else if (defaultValue && !validValues.includes(normalisedValue)) {
        return defaultValue;
    }

    return normalisedValue;
};
