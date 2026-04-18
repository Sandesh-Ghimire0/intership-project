import z from "zod";

export const signupSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(3, "length of username should be at least 3")
            .max(30, "length of username cannot be more than 30"),

        email: z.email(),

        password: z
            .string()
            .min(7, "length of password should be at least 7")
            .max(20, "length of password cannot be more than 20"),

        role: z
            .string()
            .min(3, "length of role should be at least 3")
            .max(50, "length of role cannot be more than 50")
            .optional(),

        description: z.string().min(3).max(100).optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email(),

        password: z
            .string()
            .min(7, "length of password should be at least 7")
            .max(20, "length of password cannot be more than 20"),
    }),
});
