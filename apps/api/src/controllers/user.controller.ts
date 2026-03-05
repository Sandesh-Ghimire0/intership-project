import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    createNewUser,
    fetchAssigneeByUsername,
} from "../services/user.service.js";

const createUser = asyncHandler(async function (req: Request, res: Response) {
    const data = req.body;

    const createdUser = await createNewUser(data);

    if (!createdUser) {
        throw new ApiError(400, "Something went wrong while creating user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User created Successfully !!!"),
        );
});

const validateAssingee = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;

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

export { createUser, validateAssingee };
