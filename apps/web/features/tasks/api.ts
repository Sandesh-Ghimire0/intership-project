import axios from "axios";
import { IFormData, ITask } from "./type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTask = async (): Promise<ITask[] | undefined> => {
    try {
        const res = await axios.get(`${API_URL}/api/v1/task/tasks`);
        return res.data.data;
    } catch (error) {
        console.log("ERROR :: fetching task", error);
        return;
    }
};

export const createTask = async (task: IFormData) => {
    try {
        const res = await axios.post(`${API_URL}/api/v1/task/tasks`, task);
        return res.data;
    } catch (error) {
        console.log("ERROR :: creating task", error);
    }
};

export const deleteTask = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}/api/v1/task/tasks/${id}`);
        return res;
    } catch (error) {
        console.log("ERROR :: deleting task", error);
    }
};

export const updateTask = async (id: string, taskData:any) => {
     try {
        const res = await axios.put(`${API_URL}/api/v1/task/tasks/${id}`, taskData);
        return res;
    } catch (error) {
        console.log("ERROR :: deleting task", error);
    }
}

