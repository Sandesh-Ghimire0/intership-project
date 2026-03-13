import { Request, Response } from "express";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { ApiError } from "../shared/utils/apiError.js";

import { fetchAssigneeByUsername } from "./user.service.js";

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

export { validateAssingee };
