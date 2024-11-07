# Roark Analytics SDK

Simple and powerful voice analytics for your application. Stream real-time calls to Roark Analytics and get instant insights.

## Installation

```bash
npm install @roark/sdk
```

## Quick Start

```typescript
import RoarkAnalytics from '@roark/sdk';

// Initialize the client
const roark = new RoarkAnalytics({
  apiKey: 'your-api-key',
  environment: 'production' // or 'development'
});

// Start analyzing a call
const audioStream = // Your audio stream
const call = await roark.listen(audioStream, {
  phoneNumber: '+1234567890',
});

// Later, stop the analysis when done
call.stop();

// Add additional metadata during the call
call.addMetadata({
  agentId: 'agent_789'
});
```

## Features

- 🚀 Simple, promise-based API
- 🔐 Secure WebSocket communication
- 📱 Real-time voice analytics
- 🎯 Flexible metadata support
- 💪 TypeScript support out of the box

## API Reference

### `new RoarkAnalytics(config)`

Creates a new instance of the Roark Analytics client.

#### Config Options

- `apiKey` (required): Your Roark Analytics API key
- `environment` (optional): Either 'production' or 'development'. Defaults to 'production'

### `live(stream, metadata)`

Starts a live call analysis session.

#### Parameters

- `stream`: A ReadableStream of audio data
- `metadata`: Object containing call information
  - `phoneNumber` (required): The phone number of the caller
  - `customerId` (optional): Your internal customer ID
  - `sessionId` (optional): Your internal session ID
  - Additional custom fields are supported

#### Returns

Promise resolving to a call control object with methods:
- `stop()`: Ends the call analysis session
- `addMetadata(metadata)`: Adds additional metadata to the ongoing call

## Support

Need help? Contact us at support@roark-analytics.com