
import axios from "../axios/axios";
import { UserDetailsType, UserType } from "../types/types";

export const login = async (email: string, password: string) => {
    try {
        const { data } = await axios.post('/User/login', { email, password });
        const { id,userName, phone, token } = data;
        console.log('id:', id);
        console.log('UserName:', userName);
        console.log('Phone:', phone);
        console.log('Token:', token);
        const userDetails: UserDetailsType = {id:id, name: userName, email: email, phone: phone };
        return { token: token, user: userDetails };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
export const getNewPassword = async (email: string) => {
    try {
        console.log(`Requesting new password for email: ${email}`);
        const response = await axios.get(`/User/forgetPassword`, { params: { email } });
        const password: string | null = response.data; // Assuming the password is in response.data.password
        console.log(`New password received: ${password}`);
        return password;
    } catch (error) {
        console.log('Error during getNewPassword:', error);
        throw error;
    }
};

export const petUserByEmailEndPassword = async (email:string,password:string) => {
    try {
        const response= await axios.put('/User', { email ,password })
        return response.data;
    }
    catch (error) {
        console.error('Error during petUserByEmailEndPassword:', error);
        throw error;
    }
}