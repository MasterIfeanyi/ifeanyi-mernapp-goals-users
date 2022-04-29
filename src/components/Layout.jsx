import { Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import Footer from "./Footer"

const Layout = () => {
    return (
        <>
            <Navigation/>
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout