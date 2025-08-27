import { OnModuleInit } from '@nestjs/common';
import {PluginCommonModule, VendurePlugin, EventBus, Type, Logger} from '@vendure/core';
import { CustomerEvent } from '@vendure/core';
import {SmsService} from './services/sms.service';
import type {SevenOptions} from './types';
import {loggerCtx, SEVEN_PLUGIN_OPTIONS} from './constants';

/**
 * This is the seven sms plugin.
 *
 * @category Plugin
 */
@VendurePlugin({
    compatibility: '>=3.0.0',
    imports: [PluginCommonModule],
    providers: [
        {
            provide: SEVEN_PLUGIN_OPTIONS,
            useFactory: () => SevenPlugin.options
        },
        SmsService
    ],
})
export class SevenPlugin implements OnModuleInit {
    /** @internal */
    static options: SevenOptions;

    constructor(
        private eventBus: EventBus,
        private smsService: SmsService,
    ) {}

    static init(options: SevenOptions): Type<SevenPlugin> {
        this.options = options;
        return SevenPlugin;
    }

    onModuleInit() {
        this.eventBus.ofType(CustomerEvent)
            .subscribe(async event => {
                Logger.debug('CustomerEvent', loggerCtx)

                switch (event.type) {
                    case 'created':
                        await this.smsService.customerCreation(event);
                        break
                    default:
                        Logger.debug('skipping unhandled event type', loggerCtx)
                }
            });
    }
}
