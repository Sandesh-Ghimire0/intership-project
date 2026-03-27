import { IActivity } from "../shared/types/type.js";
import { Activity } from "./activity.model.js";

class ActivityRepository {
    async create(data: IActivity) {
        const newActivity = await Activity.create(data);
        const activity = await this.findById(newActivity._id.toString());
        return activity;
    }

    async findAll() {
        const activities = await Activity.find()
            .populate("userId")
            .populate("receiverId")
            .sort({ createdAt: -1 });
        return activities;
    }

    async findById(id: string) {
        const activity = await Activity.findById(id)
            .populate("userId")
            .populate("receiverId")
            .sort({ createdAt: -1 });
        return activity;
    }

    async findByUserId(id: string) {
        console.log(id);
        const activities = await Activity.find({
            $or: [{ userId: id }, { receiverId: id }],
        })
            .populate("userId")
            .populate("receiverId")
            .sort({ createdAt: -1 });

        return activities;
    }
}

export const activityRepository = new ActivityRepository();
