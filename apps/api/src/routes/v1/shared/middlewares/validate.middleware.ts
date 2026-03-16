import { NextFunction, Request, Response } from "express";
import { success, ZodError, ZodObject } from "zod";

export const validate =
    (schema: ZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    errors: error.issues.map((error) => ({
                        path: error.path.join("."),
                        message: error.message,
                    })),
                });
            }

            return res.status(400).json({
                success: false,
                message: "Error During validation",
            });
        }
    };
