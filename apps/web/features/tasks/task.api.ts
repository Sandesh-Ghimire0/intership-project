import axios from "axios";
import { IFormData } from "./task.type";
import { ITask } from "./../shared/types/type";

const taskURL = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks`,
    withCredentials: true,
});

export const fetchTask = async (
    token: string,
): Promise<ITask[] | undefined> => {
    try {
        const res = await taskURL.get(`/`, {
            headers: { Cookie: `accessToken=${token}` },
        });
        return res.data.data;
    } catch (error) {
        console.log("ERROR :: fetching task", error);
        return;
    }
};

export const fetchMyTasks = async (
    token: string,
): Promise<ITask[] | undefined> => {
    try {
        const res = await taskURL.get(`/my`, {
            headers: { Cookie: `accessToken=${token}` },
        });
        return res.data.data;
    } catch (error) {
        console.log("ERROR :: fetching My task", error);
        return;
    }
};

export const createTask = async (task: IFormData) => {
    try {
        const res = await taskURL.post(`/`, task);
        return res.data;
    } catch (error) {
        console.log("ERROR :: creating task", error);
    }
};

export const deleteTask = async (id: string) => {
    try {
        const res = await taskURL.delete(`/${id}`);
        return res;
    } catch (error: any) {
        console.log("ERROR :: deleting task", error);
        return error.response;
    }
};

export const updateTask = async (id: string, taskData: any) => {
    try {
        const res = await taskURL.put(`/${id}`, taskData);
        return res;
    } catch (error: any) {
        console.log("ERROR :: Updating task", error);
        return error.response;
    }
};

export const autoAssignTask = async (description: string) => {
    try {
        const res = await taskURL.post("/auto-assign", { description });
        return res
    } catch (error) {
        console.log("ERROR :: auto assign ", error);
    }
};
