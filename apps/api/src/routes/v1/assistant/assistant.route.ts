import { Router } from "express";
import { queryAssistant, getAssistantHistory } from "./assistant.controller.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";
import { assistantLimiter } from "../shared/middlewares/rateLimit.middleware.js";

const assistantRouter: Router = Router();

assistantRouter
    .route("/query")
    .post(verifyJWT, assistantLimiter, queryAssistant);
assistantRouter.route("/history").get(verifyJWT, getAssistantHistory);

export default assistantRouter;
