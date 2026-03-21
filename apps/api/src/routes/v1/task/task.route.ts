import { Router } from "express";
import {
    fetchTask,
    deleteTask,
    createTask,
    updateTask,
    fetchMyTasks,
} from "./task.controller.js";
import { validate } from "../shared/middlewares/validate.middleware.js";
import {
    createTaskSchema,
    deleteTaskSchema,
    updateTaskSchema,
} from "./task.validation.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";

const taskRouter: Router = Router();

taskRouter.route("/").get(verifyJWT, fetchTask);
taskRouter.route("/").post(validate(createTaskSchema), verifyJWT, createTask);
taskRouter
    .route("/:id")
    .delete(validate(deleteTaskSchema), verifyJWT, deleteTask);
taskRouter.route("/:id").put(validate(updateTaskSchema), verifyJWT, updateTask);
taskRouter.route("/my").get(verifyJWT, fetchMyTasks);

export default taskRouter;
