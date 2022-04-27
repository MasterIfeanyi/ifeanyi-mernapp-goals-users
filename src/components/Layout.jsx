import { Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"

const Layout = () => {
    return (
        <>
            <Navigation/>
            <Outlet />
        </>
    )
}

export default Layout