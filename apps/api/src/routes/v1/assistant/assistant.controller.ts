import { Request, Response } from "express";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import { ApiResponse } from "../shared/utils/apiResponse.js";
import { ApiError } from "../shared/utils/apiError.js";
import assistantService from "./assistant.service.js";

const queryAssistant = asyncHandler(async (req: Request, res: Response) => {
    const { question } = req.body;
    const { _id: userId } = (req as any).user;

    if (!question) {
        throw new ApiError(400, "Question is required");
    }

    if (!userId) {
        throw new ApiError(401, "User must be logged in to use the assistant");
    }

    const result = await assistantService.query(userId as string, question);

    if (!result) {
        throw new ApiError(500, "Failed to get response from assistant");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Assistant response fetched successfully"));
});

const getAssistantHistory = asyncHandler(async (req: Request, res: Response) => {
    const { _id: userId } = (req as any).user;

    if (!userId) {
        throw new ApiError(401, "User must be logged in to fetch history");
    }

    const history = await assistantService.fetchHistory(userId as string);

    return res
        .status(200)
        .json(new ApiResponse(200, history, "Assistant history fetched successfully"));
});

export { queryAssistant, getAssistantHistory };
