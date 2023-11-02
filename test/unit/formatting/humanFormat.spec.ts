import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import winston from 'winston';

import * as humanFormat from '../../../src/formatting/humanFormat';
import { MOCK_INFO, MOCK_HUMAN_MESSAGE, MOCK_FORMATTED_HUMAN_MESSAGE } from '../../mock/data.mock';
import { MOCK_NAMESPACE } from '../../mock/text.mock';

describe('humanFormat test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('setHumanMessage test', () => {
        beforeEach(() => {
            jest.useFakeTimers().setSystemTime();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('Should return an object with all LogMetaData fields', () => {
            const humanMessage = humanFormat.setHumanMessage(MOCK_NAMESPACE, MOCK_INFO);

            expect(humanMessage).toEqual(MOCK_HUMAN_MESSAGE);
        });
    });

    describe('formatHumanMessage tests', () => {
        let spySetHumanMessage;

        beforeEach(() => {
            spySetHumanMessage = jest
                .spyOn(humanFormat, 'setHumanMessage')
                .mockImplementation(() => MOCK_HUMAN_MESSAGE);
        });

        test('Should call setHumanMessage with correct parameters', () => {
            humanFormat.formatHumanMessage(MOCK_INFO, MOCK_NAMESPACE);

            expect(spySetHumanMessage).toHaveBeenCalledTimes(1);
            expect(spySetHumanMessage).toHaveBeenCalledWith(MOCK_NAMESPACE, MOCK_INFO);
        });

        test('Should filter out undefined keys and not return them in formattedHumanLogs', () => {
            const formattedHumanLogs = humanFormat.formatHumanMessage(MOCK_INFO, MOCK_NAMESPACE);

            expect(MOCK_HUMAN_MESSAGE).toHaveProperty('status');
            expect(MOCK_HUMAN_MESSAGE).toHaveProperty('duration');
            expect(formattedHumanLogs).not.toContain('status');
            expect(formattedHumanLogs).not.toContain('duration');
        });
    });
    describe('createHumanFormat tests', () => {
        let spyWinstonPrintF;
        let spyFormatHumanMessage;

        beforeEach(() => {
            spyFormatHumanMessage = jest
                .spyOn(humanFormat, 'formatHumanMessage')
                .mockImplementation(() => MOCK_FORMATTED_HUMAN_MESSAGE as any);
            spyWinstonPrintF = jest
                .spyOn(winston.format, 'printf')
                .mockImplementation(() => humanFormat.formatHumanMessage(MOCK_INFO, MOCK_NAMESPACE) as any);
        });

        test('Should call winston printf method once', () => {
            humanFormat.createHumanFormat(MOCK_NAMESPACE);

            expect(spyWinstonPrintF).toHaveBeenCalledTimes(1);
            expect(spyWinstonPrintF).toHaveBeenCalledWith(expect.any(Function));
        });

        test('Should call formatHumanMessage once with correct parameters', () => {
            humanFormat.createHumanFormat(MOCK_NAMESPACE);

            expect(spyFormatHumanMessage).toHaveBeenCalledTimes(1);
            expect(spyFormatHumanMessage).toHaveBeenCalledWith(MOCK_INFO, MOCK_NAMESPACE);
        });

        test('Should return formattedHumanLogs in correct format', () => {
            const formattedHumanLogs = humanFormat.createHumanFormat(MOCK_NAMESPACE);

            expect(formattedHumanLogs).toEqual(MOCK_FORMATTED_HUMAN_MESSAGE);
        });
    });
});
