import {createBrowserRouter } from "react-router-dom";
import { PATHS } from "./path";
import Layout from "./layout";
import GuestGuard from "../utils/GuestGuard";
import AuthGuard from "../utils/AuthGuard";
import SignInSide from "../pages/loginPage";
import SignUp from "../pages/signinPage";
import SignInSideWithNewPassword from "../pages/forgetPasswordPage";
import ScrollDialog from "../pages/addItemPage";
import TemporaryDrawer from "../pages/profilePage";
import HomePage from "../pages/homePage";
import AboutPage from "../componnent/componentAbout";
import DataFetchingComponent from "../componnent/try";

export const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>, 
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: PATHS.home,
                element: <HomePage/>
            },
            {
                path: PATHS.additem,
                element: <ScrollDialog/>
            },
            {
                path: PATHS.about,
                element:<AboutPage/>
            },
            {
                path: `${PATHS.items}/:id`,
                element:<DataFetchingComponent/>
            },
            {
                path: PATHS.myArea,
                element: <TemporaryDrawer/> 
            },
            // {
            //     path: PATHS.addRequest,
            //     element: <TemporaryDrawer/> 
            // },
        ]  
    },
    { 
        path: PATHS.forgetPassword,
        element:<SignInSideWithNewPassword/>
    },
    { 
        path: PATHS.signin,
        element:<GuestGuard><SignUp/></GuestGuard>
    },
    { 
        path: PATHS.login,
        element:<SignInSide/>
    }, 
])


