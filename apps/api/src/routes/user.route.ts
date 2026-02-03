import { Router } from "express";
import { createUser, validateAssingee } from "../controllers/user.controller.js";

const userRouter: Router = Router()

userRouter.route("/users").post(createUser)
userRouter.route("/assignees/validate/:username").get(validateAssingee)

export default userRouter