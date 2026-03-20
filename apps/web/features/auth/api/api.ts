import axios from "axios";
import { promises } from "dns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = axios.post(`${API_URL}/api/v1/auth/login`, data);
        return res;
    } catch (error) {
        console.log("Error while logging user:", error);
    }
};
