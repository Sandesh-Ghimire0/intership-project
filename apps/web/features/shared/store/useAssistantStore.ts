import { create } from "zustand";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AssistantState {
    isOpen: boolean;
    messages: Message[];
    toggleAssistant: () => void;
    addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
    setMessages: (messages: Message[]) => void;
    clearMessages: () => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
    isOpen: false,
    messages: [],
    toggleAssistant: () => set((state) => ({ isOpen: !state.isOpen })),
    addMessage: (msg) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    ...msg,
                    id: Math.random().toString(36).substring(7),
                    timestamp: new Date(),
                },
            ],
        })),
    setMessages: (messages) => set({ messages }),
    clearMessages: () => set({ messages: [] }),
}));
