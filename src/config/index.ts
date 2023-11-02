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
export const EXPECTED_HUMAN_LOG = 'true';
const LOG_LEVEL_ENV = process.env['LOG_LEVEL'] || '';
const HUMAN_LOG_ENV = process.env['HUMAN'] || '';

export const level = validateEnvironmentValue(LOG_LEVEL_ENV, Object.keys(levels));
export const humanReadable = validateEnvironmentValue(HUMAN_LOG_ENV, [EXPECTED_HUMAN_LOG, DEFAULT_HUMAN_LOG], DEFAULT_HUMAN_LOG);
