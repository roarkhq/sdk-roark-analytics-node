import WebSocket from 'ws';

interface RoarkConfig {
  apiKey: string;
  environment?: 'production' | 'development';
}

interface CallMetadata {
  phoneNumber: string;
  customerId?: string;
  sessionId?: string;
  [key: string]: string | undefined;
}

class RoarkAnalytics {
  private apiKey: string;
  private baseUrl: string;
  private ws: WebSocket | null = null;

  constructor(config: RoarkConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.environment === 'development' 
      ? 'wss://dev-api.roark-analytics.com'
      : 'wss://api.roark-analytics.com';
  }

  /**
   * Initializes a live call analysis session
   * @param stream - Audio stream (supports various formats including raw PCM and Opus)
   * @param metadata - Call metadata including phone number and optional customer information
   * @returns A promise that resolves with the call analysis session
   */
  async live(stream: ReadableStream, metadata: CallMetadata) {
    if (!metadata.phoneNumber) {
      throw new Error('Phone number is required in call metadata');
    }

    // Initialize WebSocket connection
    this.ws = new WebSocket(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      }
    });

    // Handle the connection
    return new Promise((resolve, reject) => {
      this.ws!.on('open', () => {
        // Send initial metadata
        this.ws!.send(JSON.stringify({
          type: 'metadata',
          data: metadata
        }));

        // Start streaming audio
        this.streamAudio(stream);
        
        resolve({
          // Return methods to interact with the ongoing call
          stop: () => this.stop(),
          addMetadata: (additionalMetadata: Partial<CallMetadata>) => 
            this.addMetadata(additionalMetadata),
        });
      });

      this.ws!.on('error', (error: any) => {
        reject(error);
      });
    });
  }

  private async streamAudio(stream: ReadableStream) {
    const reader = stream.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done || !this.ws) break;
      
      this.ws.send(JSON.stringify({
        type: 'audio',
        data: value
      }));
    }
  }

  private stop() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private addMetadata(metadata: Partial<CallMetadata>) {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        type: 'metadata',
        data: metadata
      }));
    }
  }
}

export default RoarkAnalytics;