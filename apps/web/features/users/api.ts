import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const validateAssignee = async (username: string) => {
    try {
        const res = await axios.get(
            `${API_URL}/api/v1/user/assignees/validate/${username}`,
        );
        return res;
    } catch (error: any) {
        console.log("ERROR :: validating assignee ", error);
        return error.response;
    }
};