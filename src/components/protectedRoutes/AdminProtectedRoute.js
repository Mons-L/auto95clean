import {useRouter} from "next/router";
import global from "../../pagesPath"
import {useEffect, useState} from "react";
import apiHandler from "../../apiHandler";
import Loader from "../Loader";
import {Row} from "react-bootstrap";
const ADMIN_ROLE = "ADMIN"

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
            else if (pageProps.user.role !== ADMIN_ROLE)
            router.push(global.CLIENT_DASHBOARD_PAGE_PATH)
    }, [loading])

    return(
        <>
            {
                !pageProps.user || pageProps.user.role !== ADMIN_ROLE?
                    <Row className={"justify-content-center my-auto text-center"}>
                        <p>Veuillez patienter pendant que nous verifions votre identité.</p>
                        <Loader />
                    </Row>
                :
                    children
            }
        </>
    )
}

export default UserProtectedRoute