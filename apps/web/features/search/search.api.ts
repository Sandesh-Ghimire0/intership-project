import axios from "axios";
import { ITask } from "../shared/types/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSearchResults = async (q: string)=> {
    try {
        const res = await axios.get(`${API_URL}/api/v1/search?q=${q}`, {
            withCredentials: true,
        });
    
        return res
    } catch (error) {
        console.log("ERROR :: search failed ", error)
        throw error
    }
};
