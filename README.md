<img alt='' src='https://www.seven.io/wp-content/uploads/Logo.svg' width='250' />

# seven SMS Plugin for Vendure

A Vendure plugin that integrates SMS notifications via [seven.io](https://seven.io) service. Send automated SMS messages to customers on various events such as account creation.

## Features

- 🚀 Easy integration with Vendure e-commerce platform
- 📱 SMS notifications via seven.io REST API
- ⚡ Event-driven SMS triggers (currently supports customer creation)
- 🎨 Customizable message templates with variable substitution
- ⚙️ Configurable per-event enablement

## Prerequisites

- [Vendure](https://vendure.io/) v3.0.0 or higher
- Active seven.io account with [API key](https://help.seven.io/en/articles/9582186-where-do-i-find-my-api-key)
- Node.js and npm/yarn

## Installation

1. **Get a seven.io API Key**
   
   Sign up at [seven.io](https://seven.io) and obtain your API key from the dashboard.

2. **Install the Plugin**
   
   The plugin is included in your Vendure project. No additional installation required.

## Setup

1. **Configure Environment Variables** (optional but recommended)
   
   Create or update your `.env` file:
   ```env
   SEVEN_API_KEY=your_seven_api_key_here
   ```

2. **Add Plugin to Vendure Configuration**
   
   In your `vendure-config.ts`, import and configure the SevenPlugin:

   ```typescript
   import { SevenPlugin } from './plugins/seven/seven.plugin';

   export const config: VendureConfig = {
     // ... other configuration
     plugins: [
       // ... other plugins
       SevenPlugin.init({
         apiKey: process.env.SEVEN_API_KEY || 'your_api_key_here',
         events: {
           customerCreation: {
             enabled: true,
             text: 'Welcome {{firstName}} {{lastName}}! Your account has been created. Contact us if you need help.'
           },
           orderCreation: {
             enabled: true,
             text: 'Dear {{firstName}} {{lastName}}, thanks for your order. We will notify as soon as the package leaves our warehouse.'
           }
         }
       }),
     ],
   };
   ```

## Configuration Options

### Plugin Options

```typescript
interface PluginInitOptions {
  apiKey: string;           // Your seven.io API key
  events: {
    customerCreation: {
      enabled: boolean;     // Enable/disable SMS on customer creation
      text: string;         // SMS message template
    }
  }
}
```

### Message Templates

Use template variables in your SMS messages:

- `{{firstName}}` - Customer's first name
- `{{lastName}}` - Customer's last name  
- `{{phoneNumber}}` - Customer's phone number
- `{{identifier}}` - Customer's email/identifier

Example:
```text
Dear {{firstName}} {{lastName}}, welcome to our store! We've sent a confirmation to {{identifier}}.
```

## Usage

Once configured, the plugin will automatically:

1. **Listen for Customer Events** - Monitors when new customers are created
2. **Check Configuration** - Verifies if SMS is enabled for the event
3. **Validate Phone Number** - Ensures customer has a valid phone number
4. **Send SMS** - Dispatches personalized SMS via seven.io API

### Customer Creation SMS

When a new customer registers and provides a phone number, they'll automatically receive an SMS if:
- `customerCreation.enabled` is `true`
- Customer has a valid `phoneNumber`
- A message `text` is configured

## Development

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Testing SMS Integration

1. Create a test customer with a valid phone number
2. Check the console logs for SMS dispatch confirmation
3. Verify SMS delivery on the provided phone number

## API Reference

### SmsService

The core service handling SMS operations:

```typescript
class SmsService {
  // Send SMS on customer creation
  async customerCreation(customer: Customer): Promise<void>
  
  // Internal method to dispatch SMS via seven.io
  protected async dispatch({body}: {body: {text: string, to: string}}): Promise<any>
}
```

## Troubleshooting

### Common Issues

**SMS not sending:**
- Verify your seven.io API key is correct
- Check that `customerCreation.enabled` is `true`
- Ensure customer has a valid phone number
- Check console logs for error messages

**Invalid phone number format:**
- Ensure phone numbers include country code
- Example: `+1234567890` (US format)

**Template variables not working:**
- Verify template syntax uses double curly braces: `{{variableName}}`
- Check that customer object has the required fields

### Debug Mode

Enable debug logging by checking console output when customers are created. The service logs the API response from seven.io.

## Support

For issues related to:
- **Seven.io API**: Contact [seven.io support](https://seven.io/support)
- **Vendure Platform**: Check [Vendure documentation](https://vendure.io/docs)
- **This Plugin**: Review the code and configuration in your project

## License

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
