import {useRouter} from "next/router";
import global from "../../pagesPath"
import {useEffect, useState} from "react";
import apiHandler from "../../apiHandler";
const ADMIN_ROLE = "ADMIN"

const UserProtectedRoute = ({ children, ...pageProps }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiHandler
            .loggedIn()
            .then(response => {
                pageProps.setUser(response.data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    useEffect(() => {
        if(!loading)
            if(!pageProps.user)
                router.push(global.AUTHENTICATION_PAGE_PATH)
            else if (pageProps.user.role !== ADMIN_ROLE)
            router.push(global.CLIENT_DASHBOARD_PAGE_PATH)
    }, [loading])

    return(
        <>
            {
                !pageProps.user || pageProps.user.role !== ADMIN_ROLE?
                    <div>Loading</div>
                    :
                    children
            }
        </>
    )
}

export default UserProtectedRoute