type ValidateEnvOptions = {
  allowTest?: boolean;
};

export const validateEnvironmentValue = (
    value: string,
    validValues: string[],
    defaultValue: string = '',
    options: ValidateEnvOptions = {}
): string => {
    const normalisedValue = value.toLowerCase();
    const isTestEnv = normalisedValue === 'test';

    // Force-allow 'test' if option enabled
    if (isTestEnv && options.allowTest) {
        return 'test';
    }

    if (!defaultValue && !validValues.includes(normalisedValue)) {
        throw new Error(
            'No valid environment variable set');
    }

    if (defaultValue && !validValues.includes(normalisedValue)) {
        return defaultValue.toLowerCase();
    }

    return normalisedValue;
};
