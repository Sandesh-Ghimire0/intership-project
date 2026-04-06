import mongoose from "mongoose";
import { Task } from "../task/task.model.js";
import { Activity } from "../activity/activity.model.js";

class DashboardService {
    async fetchStats(userId: string) {
        const stats = await Task.aggregate([
            {
                $facet: {
                    totalTasks: [{ $count: "count" }],

                    myTotalTasks: [
                        {
                            $match: {
                                $or: [
                                    {
                                        assignees: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                    {
                                        reporter: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                ],
                            },
                        },
                        { $count: "count" },
                    ],

                    overdueTasks: [
                        {
                            $match: {
                                $or: [
                                    {
                                        assignees: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                    {
                                        reporter: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                ],
                                status: { $ne: "done" },
                                dueDate: { $lt: new Date() },
                            },
                        },
                        { $count: "count" },
                    ],

                    completedTasks: [
                        {
                            $match: {
                                $or: [
                                    {
                                        assignees: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                    {
                                        reporter: new mongoose.Types.ObjectId(
                                            userId,
                                        ),
                                    },
                                ],
                                status: "done",
                            },
                        },
                        { $count: "count" },
                    ],
                },
            },
        ]);

        const result = stats[0];

        const total = result.totalTasks[0]?.count || 0;
        const myTotal = result.myTotalTasks[0]?.count || 0;
        const overdue = result.overdueTasks[0]?.count || 0;
        const completed = result.completedTasks[0]?.count || 0;

        return {
            totalTasks: total,
            myTotalTasks: myTotal,
            myOverdueTasks: overdue,
            completionRate:
                myTotal > 0 ? Math.round((completed / myTotal) * 100) : 0,
        };
    }

    async fetchPriorityDistribution(userId: string) {
        const distribution = await Task.aggregate([
            {
                $match: {
                    $or: [
                        { assignees: new mongoose.Types.ObjectId(userId) },
                        { reporter: new mongoose.Types.ObjectId(userId) },
                    ],
                },
            },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const formattedData = distribution.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc
        }, {});

        return {
            critical: formattedData.critical || 0,
            high: formattedData.high || 0,
            medium: formattedData.medium || 0,
            low: formattedData.low || 0,
        };
    }

    async fetchStatusDistrubution(userId: string) {
        const distribution = await Task.aggregate([
            {
                $match: {
                    $or: [
                        { assignees: new mongoose.Types.ObjectId(userId) },
                        { reporter: new mongoose.Types.ObjectId(userId) },
                    ],
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const formattedData = distribution.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc
        }, {});

        return {
            todo: formattedData.todo || 0,
            inProgress: formattedData.inProgress || 0,
            done: formattedData.done || 0,
        };
    }

    async fetchTopPriorityTask(userId: string) {
        const tasks = await Task.find({
            $or: [{ assignees: userId }, { reporter: userId }],
            status: { $ne: "done" },
        })
            .select("_id title dueDate status")
            .sort({ dueDate: 1 })
            .limit(5);

        return tasks;
    }

    async fetchRecentActivity(userId: string) {
        const activity = await Activity.find({
            $or: [{ userId: userId }, { receiverId: userId }],
        })
            .populate("userId", "username")
            .sort({ createdAt: -1 })
            .limit(5);

        return activity;
    }
}

export const dashboardService = new DashboardService();
