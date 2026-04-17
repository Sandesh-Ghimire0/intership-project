import { Router } from "express";
import {
    fetchTask,
    deleteTask,
    createTask,
    updateTask,
    fetchMyTasks,
    autoAssignTask,
} from "./task.controller.js";
import { validate } from "../shared/middlewares/validate.middleware.js";
import {
    createTaskSchema,
    deleteTaskSchema,
    updateTaskSchema,
} from "./task.validation.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";
import { authorizeUpdateOrDelete } from "./task.middleware.js";

const taskRouter: Router = Router();

taskRouter.route("/").get(verifyJWT, fetchTask);
taskRouter.route("/").post(verifyJWT, validate(createTaskSchema), createTask);
taskRouter
    .route("/:id")
    .delete(
        verifyJWT,
        authorizeUpdateOrDelete,
        validate(deleteTaskSchema),
        deleteTask,
    );
taskRouter
    .route("/:id")
    .put(
        verifyJWT,
        authorizeUpdateOrDelete,
        validate(updateTaskSchema),
        updateTask,
    );
taskRouter.route("/my").get(verifyJWT, fetchMyTasks);
taskRouter.route("/auto-assign").post(verifyJWT, autoAssignTask)

export default taskRouter;
