import { Router } from "express";
import { fetchUsername, validateAssingee } from "./user.controller.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";

const userRouter: Router = Router()

userRouter.route("/assignees/validate").get(verifyJWT, validateAssingee)
userRouter.route("/suggestions").get(verifyJWT, fetchUsername)

export default userRouter