/**
 * @description
 * The plugin can be configured using the following options:
 */
export interface SevenOptions {
    apiKey: string
    events: {
        customerCreation: {
            enabled: boolean
            text: string
        }
    }
}
