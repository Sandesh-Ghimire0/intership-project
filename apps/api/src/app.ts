import express, { Request, Response, Express } from "express";
import cors from 'cors'
export const app: Express = express();


app.use(cors())
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------------

import v1Router from "./routes/v1/index.js";

app.use("/api/v1", v1Router);

