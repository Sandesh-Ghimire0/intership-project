import { Router } from "express";
import { login, logout, signup } from "./auth.controller.js";
import { validate } from "../shared/middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";

const authRouter: Router = Router();

authRouter.route("/signup").post(validate(signupSchema), signup);
authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/logout").post(logout);

export default authRouter;
