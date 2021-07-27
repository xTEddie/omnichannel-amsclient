import LogLevel from "@microsoft/omnichannel-ic3core/lib/logging/LogLevel";
import AMSLogger from "../src/AMSLogger";

describe('AMSLogger', () => {

    it('AMSLogger.log() should call PlugableLogger.logClientSdkTelemetryEvent()', () => {
        const pluggableLogger = {
            logClientSdkTelemetryEvent: (level: any, data: any) => {}
        }

        const logger = new AMSLogger(pluggableLogger);

        jest.spyOn(pluggableLogger, 'logClientSdkTelemetryEvent');

        const logData = {
            ChatId: 'ChatId',
            AMSClientVersion: 'AMSClientVersion'
        }

        logger.log(LogLevel.DEBUG, 'TelemetryEvent', logData);

        expect(pluggableLogger.logClientSdkTelemetryEvent).toHaveBeenCalledTimes(1);
    })
});