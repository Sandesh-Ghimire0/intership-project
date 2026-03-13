import { Router } from "express";
import { login, logout, signup } from "./auth.controller.js";

const authRouter: Router = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

export default authRouter;
