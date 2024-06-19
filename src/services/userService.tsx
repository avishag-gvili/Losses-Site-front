import axios from "../axios/axios";
import { UserType } from "../types/types";

export const PostApi  = async (userToPost:UserType) => {
    const response = await axios.post('/User/signIn',userToPost)
    return response.data
};
export const UpdateApi = async (userToPut:UserType,id:number) => {
    const response = await axios.put(`/User/${id}`,userToPut)
    return response.data
};
export const DeleteApi = async (id: number) => {
    const response= await axios.delete(`/User/${id}`)
    return response.data
};
export const getById = async (id: number) => {
    const response= await axios.get(`/User/${id}`)
    return response.data
};