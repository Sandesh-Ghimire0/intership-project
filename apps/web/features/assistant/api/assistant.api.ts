import axios from "axios";

const assistantURL = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/assistant`,
    withCredentials: true,
});

export const queryAssistant = async (question: string) => {
    try {
        const res = await assistantURL.post(`/query`, { question });
        return res;
    } catch (error: any) {
        console.log("ERROR :: querying assistant", error);
        return error.response;
    }
};

export const fetchAssistantHistory = async () => {
    try {
        const res = await assistantURL.get(`/history`);
        return res.data;
    } catch (error: any) {
        console.log("ERROR :: fetching assistant history", error);
        return error.response?.data;
    }
};
