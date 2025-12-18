import { baseURL } from './api.config';

interface SSEMessage {
  message?: string;
  data?: string;
  done?: boolean;
  error?: string;
  uuid?: string;
}

interface SSECallbacks {
  onMessage: (data: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

export class SSEService {
  private eventSource: EventSource | null = null;
  private abortController: AbortController | null = null;

  async streamAIResponse(
    input: string,
    uuid: string,
    callbacks: SSECallbacks
  ): Promise<void> {
    const { onMessage, onComplete, onError } = callbacks;

    try {
      this.abortController = new AbortController();
      
      const response = await fetch(`${baseURL}/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, uuid }),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          onComplete();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6).trim();
              if (jsonStr) {
                const data: SSEMessage = JSON.parse(jsonStr);
                
                if (data.error) {
                  onError(data.error);
                  break;
                }
                
                if (data.data) {
                  onMessage(data.data);
                }
                
                if (data.done) {
                  onComplete();
                  break;
                }
              }
            } catch (e) {
              console.error('Error parsing SSE message:', e);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
          onError(error.message || 'An error occurred while streaming');
        }
      } else {
        onError('An unknown error occurred');
      }
    }
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  isActive(): boolean {
    return this.abortController !== null;
  }
}
