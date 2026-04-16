import { ApiError } from "../shared/utils/apiError.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { searchTaskByQuery } from "./search.service.js";

export const searchTasks = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q) {
        throw new ApiError(400, "query q is required");
    }

    const tasks = await searchTaskByQuery(q as string);

    if (!tasks) {
        throw new ApiError(400, "Something went wrong while searching tasks");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Task Search successfull"));
});