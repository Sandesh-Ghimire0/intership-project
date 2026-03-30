import { Request, Response } from "express";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { authService } from "./auth.service.js";
import { ApiError } from "../shared/utils/apiError.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";

const signup = asyncHandler(async (req, res) => {
    const data = req.body;

    const createdUser = await authService.createNewUser(data);
    if (!createdUser) {
        throw new ApiError(400, "something went wrong while creating the user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User created successfully !!!"),
        );
});

const login = asyncHandler(async (req, res) => {
    const data = req.body;

    const { user, accessToken } = await authService.verifyUser(data);

    if (!user || !accessToken) {
        throw new ApiError(
            400,
            "Something went wrong while authenticating user",
        );
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
        })
        .json(
            new ApiResponse(
                200,
                { user, accessToken },
                "User logged in successfully !!!",
            ),
        );
});

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true })
        .json(new ApiResponse(200, {}, "User logged out successfully !!!"));
});

export { signup, login, logout };
