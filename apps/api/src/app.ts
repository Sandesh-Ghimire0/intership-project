import express, { Request, Response, Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./routes/v1/auth/auth.middleware.js";

export const app: Express = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------------

import v1Router from "./routes/v1/index.js";

app.use("/api/v1", v1Router);
