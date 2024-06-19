import axios from "../axios/axios";
import { ItemType, RequestType } from "../types/types";

export const GetByCategoryIdApi = async(id:number) => {
    const response = await axios.get(`/Request/category/${id}`);
    return response.data
};

export const GetByUserIdApi = async(id:number) => {
    const response = await axios.get(`/Request/user/${id}`);
    return response.data
};
export const PostApi  = async (requestToPost:RequestType) => {
    const response = await axios.post('/Request',requestToPost)
    return response.data
};
export const DeleteApi = async (id: number) => {
    const response= await axios.delete(`/Request/${id}`)
    return response.data
};
export const UpdateApi = async (requestToPut:ItemType,id:number) => {
    const response = await axios.put(`/Request/${id}`,requestToPut)
    return response.data
};


