import { ApiError } from "../shared/utils/apiError.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { dashboardService } from "./dashboard.service.js";

export const fetchStats = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const stats = await dashboardService.fetchStats(_id as string);

    if (!stats) {
        throw new ApiError(
            500,
            "something went wrong while fetching the stats",
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "stats fetched successfully"));
});

export const fetchPriorityDistribution = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const priorityDistribution =
        await dashboardService.fetchPriorityDistribution(_id as string);

    if (!priorityDistribution) {
        throw new ApiError(
            500,
            "something went wrong while fetching the priorityDistribution",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                priorityDistribution,
                "priority distribution fetched successfully",
            ),
        );
});

export const fetchStatusDistrubution = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const statusDistribution = await dashboardService.fetchStatusDistrubution(
        _id as string,
    );

    if (!statusDistribution) {
        throw new ApiError(
            500,
            "something went wrong while fetching the stats",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                statusDistribution,
                "statusDistribution fetched successfully",
            ),
        );
});

export const fetchTopPriorityTask = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const topPriorityTasks = await dashboardService.fetchTopPriorityTask(
        _id as string,
    );

    if (!topPriorityTasks) {
        throw new ApiError(
            500,
            "something went wrong while fetching the stats",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                topPriorityTasks,
                "topPriorityTasks fetched successfully",
            ),
        );
});

export const fetchRecentActivity = asyncHandler(async (req, res) => {
    const { _id } = (req as any).user;

    if (!_id) {
        throw new ApiError(400, "Id is required");
    }

    const recentActivity = await dashboardService.fetchRecentActivity(
        _id as string,
    );

    if (!recentActivity) {
        throw new ApiError(
            500,
            "something went wrong while fetching the stats",
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                recentActivity,
                "recentActivity fetched successfully",
            ),
        );
});
