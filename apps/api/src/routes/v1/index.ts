import { Router } from "express";
import taskRouter from "./task/task.route.js";
import userRouter from "./user/user.route.js";
import authRouter from "./auth/auth.route.js";
import activityRouter from "./activity/activity.route.js";

const v1Router:Router = Router()

v1Router.use('/tasks', taskRouter)
v1Router.use('/users', userRouter)
v1Router.use('/auth', authRouter)
v1Router.use('/activity',activityRouter)

export default v1Router