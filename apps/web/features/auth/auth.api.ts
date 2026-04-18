import { IUser } from "./../shared/types/type";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signupUser = async (data: Partial<IUser>) => {
    try {
        const res = await axios.post(`${API_URL}/api/v1/auth/signup`, data);
        return { success: true, error: null };
    } catch (error: any) {
        console.log("Error while signing up user:", error);
        return {
            success: false,
            error: error.response.data,
            status: error.response.status,
        };
    }
};

export const fetchMyData = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/v1/auth/me`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log("ERROR :: Failed to fetch my data ", error);
    }
};
