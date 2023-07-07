import {useRouter} from "next/router";
import global from "../../pagesPath"
import {useEffect, useState} from "react";
import apiHandler from "../../apiHandler";
const ADMIN_ROLE = "ADMIN"

const UserProtectedRoute = ({ children, ...pageProps }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiHandler
            .loggedIn()
            .then(response => {
                setUser(response.data.user)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if(!loading && user)
            router.push(user.role === ADMIN_ROLE? global.ADMIN_DASHBOARD_PAGE_PATH : global.CLIENT_DASHBOARD_PAGE_PATH)
    }, [loading])

    return(
        <>
            {
                loading || user?
                    <div>Loading</div>
                    :
                    children
            }
        </>
    )
}

export default UserProtectedRoute