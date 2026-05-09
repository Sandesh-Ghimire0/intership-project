import { Router } from "express";
import {
    fetchMyData,
    gooleLogin,
    login,
    logout,
    signup,
} from "./auth.controller.js";
import { validate } from "../shared/middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";
import passport from "./auth.middleware.js";
import { loginLimiter } from "../shared/middlewares/rateLimit.middleware.js";

const authRouter: Router = Router();

authRouter.route("/signup").post(validate(signupSchema), signup);
authRouter.route("/login").post(validate(loginSchema), loginLimiter, login);
authRouter.route("/logout").post(verifyJWT, logout);
authRouter.route("/me").get(verifyJWT, fetchMyData);

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] }),
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    gooleLogin,
);

export default authRouter;
