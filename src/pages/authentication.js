import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import global from "../pagesPath";

import {
    Container,
    Row
} from "react-bootstrap";

import {
    useEffect,
    useState
} from "react";
import apiHandler from "../apiHandler";
import {handleInput} from "../utils";
import {redirect} from "next/navigation";
import Router, {useRouter} from 'next/router'
import protectedPage from "../lib/protectedPageRoute";
import UserProtectedRoute from "../components/protectedRoutes/UserProtectedRoute";
import AuthProtectedRoute from "../components/protectedRoutes/AuthProtectedRoute";

const LOGIN_FORM_TAB_KEY = "LoginForm"
const REGISTER_FORM_TAB_KEY = "RegisterForm"
/*
export async function getServerSideProps(context) {
    console.log(context.req)
    return await protectedPage.protectAuthenticationRoute(context)
}*/

const Authentication = props => {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState(LOGIN_FORM_TAB_KEY)
    const [waiting, setWaiting] = useState(false)
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })
    const [registerInformations, setRegisterInformations] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        setWaiting(true)
        apiHandler
            .login(loginCredentials)
            .then(response => router.push(global.CLIENT_DASHBOARD_PAGE_PATH))
            .catch(err => {
                console.log(err)
                setWaiting(false)
            })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        setWaiting(true)
        apiHandler
            .register(registerInformations)
            .then(response => router.push(global.CLIENT_DASHBOARD_PAGE_PATH))
            .catch(err => {
                console.log(err)
                setWaiting(false)
            })
    }

    return(
        <AuthProtectedRoute>
            <MyNavBar activepath={'./authentication'}/>
            <Container>
                <Row className={'my-5'}>
                    { selectedTab === LOGIN_FORM_TAB_KEY &&
                        <LoginForm
                            onSubmit={handleLoginSubmit}
                            loginCredentials={loginCredentials}
                            handleOnChangeInput={(e, inputName) => handleInput(e.target.value, setLoginCredentials, false, inputName, loginCredentials)}
                            setSelectedTab={() => setSelectedTab(REGISTER_FORM_TAB_KEY)}
                        />
                    }
                    { selectedTab === REGISTER_FORM_TAB_KEY &&
                        <RegisterForm
                            onSubmit={handleRegisterSubmit}
                            registerInformations={registerInformations}
                            handleOnChangeInput={(e, inputName) => handleInput(e.target.value, setRegisterInformations, false, inputName, registerInformations)}
                            setSelectedTab={() => setSelectedTab(LOGIN_FORM_TAB_KEY)}
                        />
                    }
                </Row>
            </Container>
            <Footer />
        </AuthProtectedRoute>
    )
}

export default Authentication