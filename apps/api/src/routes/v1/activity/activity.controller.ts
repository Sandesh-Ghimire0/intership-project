import { ApiError } from "../shared/utils/apiError.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { activityService } from "./activity.service.js";

export const fetchActivities = asyncHandler(async (req, res) => {
    const activities = await activityService.fetchAllActivity();
    if (!activities) {
        throw new ApiError(
            400,
            "Something went wrong while fetching activities",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, activities, "Activites fetched successfully"),
        );
});

export const fetchMyActivity = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const activities = await activityService.fetchMyActivity(_id);
    if (!activities) {
        throw new ApiError(
            400,
            "Something went wrong while fetching my activities",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                activities,
                "My Activites fetched successfully",
            ),
        );
});
