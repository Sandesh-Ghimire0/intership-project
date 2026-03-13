import { Router } from "express";
import { validateAssingee } from "./user.controller.js";

const userRouter: Router = Router()

userRouter.route("/assignees/validate/:username").get(validateAssingee)

export default userRouter