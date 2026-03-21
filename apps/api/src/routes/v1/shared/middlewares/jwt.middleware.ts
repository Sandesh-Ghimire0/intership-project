import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request } from "express";
import { userRepository } from "../../user/user.repository.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const accessToken =
        req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    console.log(accessToken)
    if (!accessToken) {
        throw new ApiError(401, "Unauthorized Access");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error(
            "ACCESS_TOKEN_SECRET is not defined in environment variables",
        );
    }

    const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
    ) as any;

    const user = await userRepository.findUserById(decodedToken._id);

    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }

    (req as any).user = user;
    next();
});
