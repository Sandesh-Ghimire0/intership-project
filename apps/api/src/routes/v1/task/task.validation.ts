import { z } from "zod";

const taskBody = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(4, "minimum title length is 4")
        .max(50, "maximum title length is 50"),

    description: z
        .string({ error: "Description must be string" })
        .max(100)
        .default(""),

    status: z.enum(["todo", "in_progress", "done"]).default("todo"),
    priority: z.enum(["low", "medium", "high", "critical"]).default("low"),

    dueDate: z.string(),

    assignees: z.array(z.object()),
    reporter: z.union([z.string(), z.object()]),
});

export const createTaskSchema = z.object({
    body: taskBody,
});

export const deleteTaskSchema = z.object({
    params: z.object({
        id: z.string().min(10, "length of Id must be at least 10"),
    }),
});

export const updateTaskSchema = z.object({
    body: taskBody,
    params: z.object({
        id: z.string().min(10, "length of Id must be at least 10"),
    }),
});
