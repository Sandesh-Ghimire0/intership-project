import { Router } from "express";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";
import {
    fetchPriorityDistribution,
    fetchRecentActivity,
    fetchStats,
    fetchStatusDistrubution,
    fetchTopPriorityTask,
} from "./dashboard.controller.js";

const dashboardRouter: Router = Router();

dashboardRouter.route("/stats").get(verifyJWT, fetchStats);
dashboardRouter
    .route("/priority-distribution")
    .get(verifyJWT, fetchPriorityDistribution);
dashboardRouter
    .route("/status-distribution")
    .get(verifyJWT, fetchStatusDistrubution);
dashboardRouter.route("/top-task").get(verifyJWT, fetchTopPriorityTask);
dashboardRouter.route("/recent-activity").get(verifyJWT, fetchRecentActivity);

export default dashboardRouter;
