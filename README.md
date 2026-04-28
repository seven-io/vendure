<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven SMS for Vendure</h1>

<p align="center">
  Send transactional SMS for customer and order events from <a href="https://vendure.io/">Vendure</a> via the seven gateway.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Vendure-3.0%2B-blue" alt="Vendure 3.0+" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6" alt="TypeScript strict" />
</p>

---

## Features

- **Customer-Creation SMS** - Welcome new customers automatically
- **Order-Creation SMS** - Confirm orders the moment they land
- **Template Variables** - `{{firstName}}`, `{{lastName}}`, `{{phoneNumber}}`, `{{identifier}}`
- **Per-Event Toggle** - Enable each event independently

## Prerequisites

- [Vendure](https://vendure.io/) 3.0.0 or higher
- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))

## Installation

The plugin lives inside your Vendure project. After cloning into `plugins/seven/`, register it in `vendure-config.ts`:

```ts
import { SevenPlugin } from './plugins/seven/seven.plugin'

export const config: VendureConfig = {
    // ...
    plugins: [
        // ...
        SevenPlugin.init({
            apiKey: process.env.SEVEN_API_KEY!,
            events: {
                customerCreation: {
                    enabled: true,
                    text:    'Welcome {{firstName}} {{lastName}}!',
                },
                orderCreation: {
                    enabled: true,
                    text:    'Dear {{firstName}}, thanks for your order. We will notify you on shipment.',
                },
            },
        }),
    ],
}
```

## Configuration

```dotenv
SEVEN_API_KEY=your-seven-api-key
```

```ts
interface PluginInitOptions {
    apiKey: string
    events: {
        customerCreation?: { enabled: boolean; text: string }
        orderCreation?:    { enabled: boolean; text: string }
    }
}
```

### Template variables

| Placeholder | Description |
|-------------|-------------|
| `{{firstName}}` | Customer's first name |
| `{{lastName}}` | Customer's last name |
| `{{phoneNumber}}` | Customer's phone number |
| `{{identifier}}` | Customer's email / login identifier |

## Development

```bash
npm run dev    # ts-node server + worker concurrently
npm run build  # compile TS to dist/
npm run start  # production server + worker
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| SMS not sending | Verify the API key, that the event is enabled and the customer has a phone number |
| Invalid phone number | Use E.164 format with country code, e.g. `+491701234567` |
| Placeholder shows literally | Check the field exists on the customer object and the syntax is `{{name}}` |

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/vendure/issues).

## License

[MIT](LICENSE)
