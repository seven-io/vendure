# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start both server and worker in development mode (runs `dev:server` and `dev:worker` concurrently)
- `npm run dev:server` - Start the server in development mode using ts-node
- `npm run dev:worker` - Start the worker in development mode using ts-node
- `npm run build` - Build the TypeScript project to JavaScript in the `dist/` directory
- `npm run start` - Start both server and worker in production mode from built files
- `npm run start:server` - Start the server in production mode from built files
- `npm run start:worker` - Start the worker in production mode from built files

## Architecture Overview

This is a **Vendure plugin** that integrates SMS functionality via the seven.io service. The plugin is structured as follows:

### Core Components

- **`seven.plugin.ts`** - Main plugin class that implements `VendurePlugin` and `OnModuleInit`
  - Uses dependency injection to configure the SMS service
  - Subscribes to `CustomerEvent` to trigger SMS notifications on customer creation
  - Configured via the `init()` static method with `PluginInitOptions`

- **`services/sms.service.ts`** - Injectable service for SMS operations
  - Dispatches SMS messages via seven.io REST API
  - Handles customer creation events with configurable text templates
  - Uses environment-based configuration for API key and event settings

- **`types.ts`** - TypeScript interfaces defining the plugin configuration structure
  - `PluginInitOptions` interface for plugin initialization
  - Supports event-based configuration (currently `customerCreation`)

- **`constants.ts`** - Dependency injection tokens and logger context

### Integration Pattern

The plugin follows Vendure's standard plugin architecture:
- Extends `VendurePlugin` with compatibility for Vendure v3.0.0+
- Uses `PluginCommonModule` for shared functionality
- Employs NestJS dependency injection patterns
- Integrates with Vendure's event system via `EventBus`

### Configuration

The plugin is configured in `vendure-config.ts` via `SevenPlugin.init()` with:
- API key for seven.io service
- Event-specific configuration (enabled/disabled, message templates)
- Template variables support for personalized messages

### Development Notes

- Built on TypeScript with strict mode enabled
- Uses NestJS decorators and dependency injection
- Integrates with Vendure's event-driven architecture
- Follows plugin development patterns specific to Vendure v3.x
