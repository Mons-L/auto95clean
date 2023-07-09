import {useRouter} from "next/router";
import global from "../../pagesPath"
import {useEffect, useState} from "react";
import apiHandler from "../../apiHandler";
import Loader from "../Loader";
import {Row} from "react-bootstrap";
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