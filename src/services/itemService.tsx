import axios from "../axios/axios";
import { ItemType } from "../types/types";

export const GetByCategoryIdApi = async(id:number) => {
    const response = await axios.get(`/Item/category/${id}`);
    return response.data
};
export const GetApi = async() => {
    const response = await axios.get('/Item',{
        headers: {
            'Content-Type': 'application/json'
        }
    });
   
    console.log("response: ",response,)
    return response.data
};

export const GetByUserIdApi = async(id:number) => {
    const response = await axios.get(`/Item/user/${id}`);
    return response.data
};
// export const GetByUserIdApi = async (id: number, token: string) => {
//     const response = await axios.get(`/Item/user/${id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   };

export const PostApi  = async (itemToPost:ItemType) => {
    const response = await axios.post('/Item', itemToPost, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Response from API:', response.data);
    return response.data
};

export const UpdateApi = async (itemToPut:ItemType,id:number) => {
    const response = await axios.put(`/Item/${id}`,itemToPut)
    return response.data
};

export const DeleteApi = async (id: number) => {
    const response= await axios.delete(`/Item/${id}`)
    return response.data
};
