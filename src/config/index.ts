import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

import { validateEnvironmentValue } from '../utils/validateEnvironmentValue';

export const levels: AbstractConfigSetLevels = {
    error: 0,
    info: 1,
    debug: 2
};

export const colours: AbstractConfigSetColors = {
    error: 'red',
    info: 'yellow',
    debug: 'green'
};

const DEFAULT_HUMAN_LOG = 'false';
const EXPECTED_HUMAN_LOG = 'true';
const LOG_LEVEL_ENV = process.env['LOG_LEVEL'] || '';
const HUMAN_LOG_ENV = process.env['HUMAN'] || '';

export const LOG_LEVEL = validateEnvironmentValue(LOG_LEVEL_ENV, Object.keys(levels));
export const HUMAN_LOG = validateEnvironmentValue(HUMAN_LOG_ENV, [EXPECTED_HUMAN_LOG, DEFAULT_HUMAN_LOG], DEFAULT_HUMAN_LOG);
