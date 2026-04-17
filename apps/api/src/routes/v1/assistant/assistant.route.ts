import { Router } from "express";
import { queryAssistant, getAssistantHistory } from "./assistant.controller.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";

const assistantRouter: Router = Router();

assistantRouter.route("/query").post(verifyJWT, queryAssistant);
assistantRouter.route("/history").get(verifyJWT, getAssistantHistory);

export default assistantRouter;
