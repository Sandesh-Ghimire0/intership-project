import { Router } from "express";
import { fetchActivities, fetchMyActivity } from "./activity.controller.js";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";

const activityRouter: Router = Router();

activityRouter.route("/").get(verifyJWT, fetchActivities);
activityRouter.route("/my").get(verifyJWT, fetchMyActivity);

export default activityRouter;
