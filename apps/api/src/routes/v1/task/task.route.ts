import { Router } from "express";
import {
    fetchTask,
    deleteTask,
    createTask,
    updateTask,
} from "./task.controller.js";
import { validate } from "../shared/middlewares/validate.middleware.js";
import {
    createTaskSchema,
    deleteTaskSchema,
    updateTaskSchema,
} from "./task.validation.js";

const taskRouter: Router = Router();

taskRouter.route("/").get(fetchTask);
taskRouter.route("/").post(validate(createTaskSchema), createTask);
taskRouter.route("/:id").delete(validate(deleteTaskSchema), deleteTask);
taskRouter.route("/:id").put(validate(updateTaskSchema), updateTask);

export default taskRouter;
