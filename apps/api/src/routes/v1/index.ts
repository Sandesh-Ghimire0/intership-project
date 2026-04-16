import { Router } from "express";
import taskRouter from "./task/task.route.js";
import userRouter from "./user/user.route.js";
import authRouter from "./auth/auth.route.js";
import activityRouter from "./activity/activity.route.js";
import dashboardRouter from "./dashboard/dashboard.route.js";
import searchRouter from "./search/search.route.js";

const v1Router: Router = Router();

v1Router.use("/tasks", taskRouter);
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/activity", activityRouter);
v1Router.use("/dashboard", dashboardRouter);
v1Router.use("/search", searchRouter)

export default v1Router;
