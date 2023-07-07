import {useRouter} from "next/router";
import global from "../../pagesPath"
import {useEffect, useState} from "react";
import apiHandler from "../../apiHandler";
const CLIENT_ROLE = "CLIENT"

const UserProtectedRoute = ({ children, ...pageProps }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiHandler
            .loggedIn()
            .then(response => {
                pageProps.setUser(response.data.user)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    useEffect(() => {
        if(!loading)
            if(!pageProps.user)
                router.push(global.AUTHENTICATION_PAGE_PATH)
            else if (pageProps.user.role !== CLIENT_ROLE)
                router.push(global.ADMIN_DASHBOARD_PAGE_PATH)
    }, [loading])

    return(
        <>
            {
                !pageProps.user || pageProps.user.role !== CLIENT_ROLE?
                    <div>Loading</div>
                :
                    children
            }
        </>
    )
}

export default UserProtectedRoute