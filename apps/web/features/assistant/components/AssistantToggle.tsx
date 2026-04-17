"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { useAssistantStore } from "@/features/shared/store/useAssistantStore";

const AssistantToggle = () => {
    const toggleAssistant = useAssistantStore((state) => state.toggleAssistant);

    return (
        <button
            onClick={toggleAssistant}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
            title="Open Assistant"
        >
            <MessageSquare size={18} />
        </button>
    );
};

export default AssistantToggle;
