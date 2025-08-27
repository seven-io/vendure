import {CustomerEvent, Logger} from "@vendure/core"
import {Inject, Injectable} from '@nestjs/common'
import type {SevenOptions} from '../types'
import {loggerCtx, SEVEN_PLUGIN_OPTIONS} from '../constants'

@Injectable()
export class SmsService {
    constructor(@Inject(SEVEN_PLUGIN_OPTIONS) protected options: SevenOptions) {
    }

    protected async dispatch({body}: { body: { text: string, to: string } }) {
        const res = await fetch('https://gateway.seven.io/api/sms', {
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                SentWith: 'VendureJS',
                'X-Api-Key': this.options.apiKey,
            },
            method: 'POST',
        })
        const json = await res.json()
        Logger.debug(JSON.stringify(json), loggerCtx)
        return json
    }

    async customerCreation(ev: CustomerEvent) {
        const {entity: customer} = ev
        const {phoneNumber: to} = customer
        if (!to) {
            Logger.debug('customerCreation has recipient', loggerCtx)
            return
        }

        const {enabled, text} = this.options.events.customerCreation
        if (!enabled) {
            Logger.debug('customerCreation is not enabled', loggerCtx)
            return
        }
        if (!text) {
            Logger.debug('customerCreation has no text', loggerCtx)
            return
        }

        await this.dispatch({
            body: {
                text: this.replacePlaceholders({entity: customer, text}),
                to
            }
        })
    }

    protected replacePlaceholders<T extends Record<any, any>>({entity, text}: { entity: T, text: string }) {
        let mutText = text

        const customerKeys = Object.keys(entity) as (keyof T)[]
        customerKeys.forEach(k => {
            const placeholder = `{{${String(k)}}}`
            const value = entity[k]?.toString() ?? placeholder
            mutText = mutText.replaceAll(placeholder, value)
        })

        return mutText
    }
}
