import { Router } from "express";
import taskRouter from "./task/task.route.js";
import userRouter from "./user/user.route.js";

const v1Router:Router = Router()

v1Router.use('/tasks', taskRouter)
v1Router.use('/users', userRouter)

export default v1Router