import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from './auth.utils'


const publicUrls = ['/User/login', '/User/signIn', `/User/forgetPassword`, '/User']


// export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
//     if (publicUrls.includes(request.url!)) {
//         return request;
//     }

//     // const authUser = getSession();
//     // if (!authUser || typeof authUser.token !== 'string' || !isValidToken(authUser.token)) {
//     //     removeSession();
//     //     return Promise.reject('Unauthorized');
//     // }

//     return request;
// };

// -אחרי שחזרה תגובה בדיקת הרשאות אחרי קריאת שרת
export const authResponseMiddleware = (response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession();
        Promise.reject('Unauthorized');
    }
    return response;
};