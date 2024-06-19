import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import HomePage from "../pages/homePage";


// export default function Layout() {
//     return <>
//         <header><HomePage/></header>
//         <nav><NavBar/><nav/>
//         <main><Outlet/></main>
//         <footer></footer>
//     </>
// }

import {useLocation} from 'react-router-dom';
import { PATHS } from "./path";
import Footer from "../componnent/componentFooter";

const Layout = () => {
    const location = useLocation();
    const hideNav = [PATHS.forgetPassword, PATHS.signin, PATHS.login].includes(location.pathname);

    return (
        <>
            <header>
            </header>
            <nav> {!hideNav && <NavBar/>}</nav>
            <main>
                <Outlet/>
            </main>
            <footer><Footer/></footer>
        </>
    );
};

export default Layout;

