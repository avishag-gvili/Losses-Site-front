import axios from "axios";

export const GetApi = async(id:number) => {
    const response = await axios.get(`/Category/${id}`);
    return response.data
};