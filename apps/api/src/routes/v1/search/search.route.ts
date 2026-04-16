import { Router } from "express";
import { verifyJWT } from "../shared/middlewares/jwt.middleware.js";
import { searchTasks } from "./search.controller.js";

const searchRouter: Router = Router();

searchRouter.route("/").get(verifyJWT, searchTasks);

export default searchRouter;
