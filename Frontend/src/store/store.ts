import { create } from "zustand";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingMessageId: string | null;
  addMessage: (message: Message) => void;
  updateStreamingMessage: (id: string, content: string) => void;
  setMessages: (messages: Message[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setStreamingMessageId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    // {
    //   id: "user-1766763287620",
    //   content: "What is AI",
    //   role: "user",
    // },
    // {
    //   id: "assistant-1766763287620",
    //   content:
    //     "**Artificial Intelligence (AI)** is a broad field of computer science focused on creating machines that can perform tasks that typically require human intelligence.\n\nIn simpler terms, **AI is about making computers \"smart\" enough to simulate human cognitive functions.** This involves processes like learning, problem-solving, decision-making, perception, and understanding language.\n\nHere's a breakdown of what that means:\n\n1.  **Simulating Human Intelligence:** AI aims to replicate or mimic the way humans think, learn, and act. This doesn't necessarily mean making a machine that *feels* or *understands* in the human sense, but rather one that can *perform tasks* that demonstrate intelligence.\n\n2.  **Learning from Data:** A core aspect of modern AI is the ability to learn from data without being explicitly programmed for every single scenario. Instead of a programmer writing specific rules for every possible input, an AI system is \"trained\" on vast amounts of data to recognize patterns, make predictions, or take actions.\n\n3.  **Key Capabilities of AI Systems:**\n    *   **Learning:** Acquiring information and rules for using the information.\n    *   **Reasoning:** Using rules to reach approximate or definite conclusions.\n    *   **Problem-solving:** Figuring out solutions to specific problems.\n    *   **Perception:** Using sensory input (like images, sounds) to deduce aspects of the world.\n    *   **Understanding Language:** Processing and understanding human language (Natural Language Processing - NLP).\n    *   **Decision-making:** Choosing the best course of action from available options.\n\n4.  **How Does it Work (Briefly)?**\n    Most modern AI, particularly what you hear about today, falls under **Machine Learning (ML)** and **Deep Learning (DL)**.\n    *   **Machine Learning:** Algorithms are trained on data to identify patterns and make predictions or decisions.\n    *   **Deep Learning:** A subset of ML that uses artificial neural networks with multiple layers (inspired by the human brain) to learn complex patterns from large datasets.\n\n5.  **Types of AI (Conceptual):**\n    *   **Narrow AI (Weak AI):** This is the AI we have today. It's designed and trained for a specific task. Examples include virtual assistants (Siri, Alexa), recommendation engines (Netflix, Amazon), spam filters, facial recognition, and self-driving car software (which is excellent at driving, but can't cook dinner or write a novel).\n    *   **General AI (Strong AI / AGI):** This is hypothetical AI that would possess human-level intelligence across a wide range of tasks, capable of reasoning, problem-solving, learning, and understanding in any intellectual domain that a human can. We are far from achieving AGI.\n    *   **Superintelligence:** A hypothetical AI that would surpass human intelligence and capability in virtually every field.\n\n6.  **Real-World Examples of AI:**\n    *   **Virtual Assistants:** Siri, Alexa, Google Assistant\n    *   **Recommendation Systems:** Netflix suggesting movies, Amazon suggesting products.\n    *   **Self-Driving Cars:** Tesla Autopilot, Waymo.\n    *   **Image and Speech Recognition:** Unlocking your phone with your face, transcribing voice messages.\n    *   **Medical Diagnosis:** AI helping doctors identify diseases from scans.\n    *   **Fraud Detection:** Banks flagging suspicious transactions.\n    *   **Language Translation:** Google Translate.\n    *   **Spam Filters:** Automatically moving unwanted emails to a junk folder.\n    *   **ChatGPT and other Large Language Models:** Generating human-like text, answering questions, writing code.\n\nIn essence, AI is a rapidly evolving field that is transforming industries and daily life by enabling machines to perform increasingly complex and intelligent tasks. It's not a single technology but a collection of techniques and approaches aimed at achieving various forms of artificial intelligence.",
    //   role: "assistant",
    // },
  ],
  isLoading: false,
  error: null,
  streamingMessageId: null,

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateStreamingMessage: (id: string, content: string) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    })),

  setMessages: (messages: Message[]) => set({ messages }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  setStreamingMessageId: (id: string | null) => set({ streamingMessageId: id }),
}));
