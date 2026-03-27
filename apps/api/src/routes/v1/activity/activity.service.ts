import { IActivity, IActivityDocument } from "../shared/types/type.js";
import { activityRepository } from "./activity.repository.js";

class ActivityService {
    async createNewActivity(data: IActivity) {
        try {
            const activity = await activityRepository.create(data);

            if (!activity) {
                throw new Error("Failed to create activity");
            }

            return activity;
        } catch (error) {
            console.log("Error while creating new activity : ", error);
            throw error;
        }
    }

    async fetchAllActivity(){
        const activities = await activityRepository.findAll();
        return activities
    }

    async fetchMyActivity(id: string){
        const activities = await activityRepository.findByUserId(id)
        return activities
    }

}

export const activityService = new ActivityService();
