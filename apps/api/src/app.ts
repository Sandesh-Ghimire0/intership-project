import express, { Request, Response, Express } from "express";
import cors from 'cors'
export const app: Express = express();


app.use(cors())
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------------

import taskRouter from "./routes/task.route.js";

app.use("/api/v1/task", taskRouter);

// localhost:4000/api/v1/task/tasks , {data}
