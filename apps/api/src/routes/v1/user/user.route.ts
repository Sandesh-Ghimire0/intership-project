import { Router } from "express";
import { createUser, validateAssingee } from "./user.controller.js";

const userRouter: Router = Router()

userRouter.route("/").post(createUser)
userRouter.route("/assignees/validate/:username").get(validateAssingee)

export default userRouter