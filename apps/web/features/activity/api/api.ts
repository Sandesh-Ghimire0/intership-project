import { IActivity } from "@/features/shared/types/type";
import axios from "axios";

const activityURL = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/activity`,
    withCredentials: true,
});

export const fetchActivities = async (token: string): Promise<IActivity[]> => {
    try {
        const res = await activityURL.get(`/`, {
            headers: { Cookie: `accessToken=${token}` },
        });
        return res.data.data;
    } catch (error) {
        console.log("ERROR :: fetching Activities", error);
        throw error;
    }
};

export const fetchMyActivities = async (token: string): Promise<IActivity[]> => {
    try {
        const res = await activityURL.get(`/my`, {
            headers: { Cookie: `accessToken=${token}` },
        });
        return res.data.data;
    } catch (error) {
        console.log("ERROR :: fetching my Activities", error);
        throw error;
    }
};
