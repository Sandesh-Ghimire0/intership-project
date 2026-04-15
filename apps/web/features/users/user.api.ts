import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const validateAssignee = async (username: string) => {
    try {
        const res = await axios.get(
            `${API_URL}/api/v1/users/assignees/validate?username=${username}`,
            { withCredentials: true },
        );
        return res;
    } catch (error: any) {
        console.log("ERROR :: validating assignee ", error);
        return error.response;
    }
};

export const fetchUserSuggestions = async (text: string) => {
    try {
        const res = await axios.get(
            `${API_URL}/api/v1/users/suggestions?username=${text}`,
            { withCredentials: true },
        );

        return res.data
    } catch (error) {
        console.log("ERROR :: fetching user suggestions ", error);
    }
};
