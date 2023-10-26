import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

import { validateLevelEnvironmentValue } from '../utils/validateLevelEnvironmentValue';
import { validateHumanEnvironmentValue } from '../utils/validateHumanEnvironmentValue';

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

const LOG_LEVEL = process.env['LOG_LEVEL'] || '';
const HUMAN_LOG = process.env['HUMAN'] || '';

export const config = {
    level: validateLevelEnvironmentValue(LOG_LEVEL),
    isHumanReadable: validateHumanEnvironmentValue(HUMAN_LOG)
};
