import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";

import {
    Container,
    Row
} from "react-bootstrap";

import {
    useState
} from "react";

const LOGIN_FORM_TAB_KEY = "LoginForm"
const REGISTER_FORM_TAB_KEY = "RegisterForm"

const Authentication = props => {

    const [selectedTab, setSelectedTab] = useState(LOGIN_FORM_TAB_KEY)

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })

    const [registerInformations, setRegisterInformations] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmedPassword: ""
    })

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        console.log("submitted for login")
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        console.log("submitted for register")
    }

    return(
        <>
            <MyNavBar activepath={'/authentication'}/>
            <Container>
                <Row className={'my-5'}>
                    { selectedTab === LOGIN_FORM_TAB_KEY &&
                        <LoginForm
                            handleSubmit={handleLoginSubmit}
                            loginCredentials={loginCredentials}
                            setSelectedTab={() => setSelectedTab(REGISTER_FORM_TAB_KEY)}
                        />
                    }
                    { selectedTab === REGISTER_FORM_TAB_KEY &&
                        <RegisterForm
                            handleSubmit={handleRegisterSubmit}
                            registerInformations={registerInformations}
                        />
                    }
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Authentication