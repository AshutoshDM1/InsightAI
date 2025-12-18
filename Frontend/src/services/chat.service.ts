import { SSEService } from './sse.service';
import { useChatStore } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export class ChatService {
  private sseService: SSEService;

  constructor() {
    this.sseService = new SSEService();
  }

  async sendMessage(input: string): Promise<void> {
    const { addMessage, updateMessage, setStreaming, setLoading, setError } = useChatStore.getState();
    
    if (!input.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // Generate UUIDs for both messages
    const userMessageId = uuidv4();
    const assistantMessageId = uuidv4();

    try {
      setLoading(true);
      setError(null);

      // Add user message
      addMessage({
        id: userMessageId,
        role: 'user',
        content: input,
        timestamp: Date.now(),
      });

      // Add empty assistant message that will be streamed
      addMessage({
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
      });

      // Start streaming
      await this.sseService.streamAIResponse(
        input,
        assistantMessageId,
        {
          onMessage: (data) => {
            updateMessage(assistantMessageId, data);
          },
          onComplete: () => {
            setStreaming(assistantMessageId, false);
            setLoading(false);
          },
          onError: (error) => {
            setError(error);
            setStreaming(assistantMessageId, false);
            setLoading(false);
            toast.error(error);
          },
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
    }
  }

  abortStream(): void {
    this.sseService.abort();
    const { setLoading } = useChatStore.getState();
    setLoading(false);
  }

  isStreaming(): boolean {
    return this.sseService.isActive();
  }
}

// Export singleton instance
export const chatService = new ChatService();
