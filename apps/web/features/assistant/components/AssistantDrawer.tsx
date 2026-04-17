"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, Trash2, Loader2 } from "lucide-react";
import { useAssistantStore } from "@/features/shared/store/useAssistantStore";
import { queryAssistant, fetchAssistantHistory } from "../api/assistant.api";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

const AssistantDrawer = () => {
    const { isOpen, toggleAssistant, messages, addMessage, setMessages, clearMessages } = useAssistantStore();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadHistory = async () => {
            if (isOpen && messages.length === 0) {
                setIsFetchingHistory(true);
                try {
                    const response = await fetchAssistantHistory();
                    if (response?.success && Array.isArray(response.data)) {
                        const historyMessages: any[] = [];
                        response.data.forEach((item: any) => {
                            historyMessages.push({
                                id: `q-${item._id}`,
                                role: "user",
                                content: item.question,
                                timestamp: new Date(item.createdAt),
                            });
                            historyMessages.push({
                                id: `a-${item._id}`,
                                role: "assistant",
                                content: item.answer,
                                timestamp: new Date(item.createdAt),
                            });
                        });
                        setMessages(historyMessages);
                    }
                } catch (error) {
                    console.error("Failed to load assistant history", error);
                } finally {
                    setIsFetchingHistory(false);
                }
            }
        };

        loadHistory();
    }, [isOpen, messages.length, setMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userQuestion = input.trim();
        setInput("");
        addMessage({ role: "user", content: userQuestion });
        setIsLoading(true);

        try {
            const response = await queryAssistant(userQuestion);
            if (response?.success) {
                addMessage({ role: "assistant", content: response.data.answer });
            } else {
                addMessage({ role: "assistant", content: "Sorry, I encountered an error. Please try again." });
            }
        } catch (error) {
            addMessage({ role: "assistant", content: "Something went wrong. Please check your connection." });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50  z-[100] transition-opacity"
                onClick={toggleAssistant}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-screen w-2xl bg-white shadow-2xl z-[101] flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white text-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <Bot className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[15px] leading-tight">AI Assistant</h3>
                            <p className="text-[12px] text-slate-400">Online & Ready to help</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={clearMessages}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-50"
                            title="Clear Chat"
                        >
                            <Trash2 size={16} />
                        </button>
                        <button
                            onClick={toggleAssistant}
                            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                >
                    {isFetchingHistory && (
                        <div className="flex justify-center p-4">
                            <Loader2 size={24} className="animate-spin text-blue-500" />
                        </div>
                    )}

                    {!isFetchingHistory && messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-slate-100">
                                <Bot className="text-blue-500" size={32} />
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-1">Welcome!</h4>
                            <p className="text-sm text-slate-500">
                                Ask me anything about your tasks, users, or general operations. I'm here to help!
                            </p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-blue-100 text-blue-600"
                                    }`}>
                                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className={`prose p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                                    }`}>
                                    <Markdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </Markdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-2 max-w-[85%]">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                                    <Bot size={14} />
                                </div>
                                <div className="p-3 rounded-2xl text-[14px] bg-white text-slate-700 border border-slate-100 rounded-tl-none flex items-center gap-2 shadow-sm">
                                    <Loader2 size={16} className="animate-spin text-blue-500" />
                                    <span>Please wait...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your message..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none max-h-32 min-h-[50px]"
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`absolute right-2.5 bottom-2.5 p-1.5 rounded-lg transition-all ${input.trim() && !isLoading
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                : "text-slate-300 bg-transparent"
                                }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssistantDrawer;
