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
import userRouter from "./routes/user.route.js";

app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter)

// localhost:4000/api/v1/task/tasks , {data}
