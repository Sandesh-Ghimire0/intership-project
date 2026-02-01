import { Router } from "express";
import { createTask, deleteTask, fetchTask, updateTask } from "../controllers/task.controller.js";

const taskRouter: Router = Router()

// taskRouter.route("/tasks").get()
taskRouter.route("/tasks").get(fetchTask)
taskRouter.route("/tasks").post(createTask)
taskRouter.route("/tasks/:id").delete(deleteTask)
taskRouter.route("/tasks/:id").put(updateTask)


export default taskRouter