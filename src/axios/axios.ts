


import axios from 'axios'
//import { authRequestMiddleware, authResponseMiddleware } from '../utils/authMiddleware'

const axiosInstance = axios.create({ baseURL: 'https://localhost:44363/api' })

// axiosInstance.interceptors.request.use(authRequestMiddleware)
// axiosInstance.interceptors.response.use(authResponseMiddleware)

export default axiosInstance;