import { Request, Response } from "express";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { ApiError } from "../shared/utils/apiError.js";

import { fetchAssigneeByUsername, fetchUserByName } from "./user.service.js";

const validateAssingee = asyncHandler(async (req: Request, res: Response) => {
    // const { username } = req.params;
    const { username } = req.query;

    if (!username) {
        throw new ApiError(400, "Assignee username is required");
    }

    const assignee = await fetchAssigneeByUsername(username as string);
    if (!assignee) {
        throw new ApiError(400, "Assignee does not exist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, assignee, "Assginee validated successfully"),
        );
});

const fetchUsername = asyncHandler(async (req, res) => {
    const { username } = req.query;

    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const users = await fetchUserByName(username as string);
    if (!users) {
        throw new ApiError(
            400,
            "Something went wrong while fetching the username",
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, users, "username fetched successfully"));
});

export { validateAssingee, fetchUsername };
