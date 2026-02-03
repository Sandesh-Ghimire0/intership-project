import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

const userRouter: Router = Router()

userRouter.route("/users").post(createUser)

export default userRouter