import { ApiError } from "../shared/utils/apiError.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { taskrepository } from "./task.repository.js";

export const authorizeUpdateOrDelete = asyncHandler(async (req, res, next) => {
    const { user } = req as any;
    const { id } = req.params;

    if (!user || !id) {
        throw new ApiError(400, "user and id is required");
    }

    const task = await taskrepository.findById(id as string);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    const isAllowed = (task as any).reporter._id.equals(user._id);

    if (!isAllowed) {
        throw new ApiError(403, "Access forbidden");
    }

    next();
});
