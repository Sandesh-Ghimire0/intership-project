import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { Task } from "../task/task.model.js";
import { User } from "../user/user.model.js";
import { Assistant } from "./assistant.model.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

class AssistantService {
    async query(userId: string, question: string) {
        const tasks = await Task.find({}); 
        const users = await User.find({}, { password: 0 });

        const context = `
            Task Data: ${JSON.stringify(tasks)}
            User Data: ${JSON.stringify(users)}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant for a task management system. Use the provided context to answer user queries. If the context doesn't contain the answer, answer based on general knowledge but mention you don't have the specific data.",
                },
                {
                    role: "user",
                    content: `Context: ${context}\n\nQuestion: ${question}`,
                },
            ],
        });

        const answer =
            response.choices?.[0]?.message?.content ||
            "I couldn't generate an answer.";

        // Save to database
        const assistantLog = await Assistant.create({
            userId,
            question,
            answer,
        });

        return assistantLog;
    }

    async fetchHistory(userId: string) {
        return await Assistant.find({ userId }).sort({ createdAt: 1 });
    }
}

export default new AssistantService();
