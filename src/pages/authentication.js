import MyNavBar from "../components/mynavbar/MyNavBar";
import {Button, Container, Form, FormControl} from "react-bootstrap";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";

const Authentication = (props) => {
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
                <LoginForm handleSubmit={handleLoginSubmit} />
                <RegisterForm handleSubmit={handleRegisterSubmit} />
            </Container>
            <Footer />
        </>
    )
}

export default Authentication