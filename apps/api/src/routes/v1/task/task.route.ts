import { Router } from "express";
import {
    fetchTask,
    deleteTask,
    createTask,
    updateTask,
} from "./task.controller.js";

const taskRouter: Router = Router();

taskRouter.route("/").get(fetchTask);
taskRouter.route("/").post(createTask);
taskRouter.route("/:id").delete(deleteTask);
taskRouter.route("/:id").put(updateTask);

export default taskRouter;
