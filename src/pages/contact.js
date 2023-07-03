import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";

import apiHandler from "../apiHandler";

import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";


import {
    useState
} from "react";
import {handleInput} from "../utils";

const Contact = props => {

    const [messageInformations, setMessageInformations] = useState({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        content: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        apiHandler
            .insertMessage(messageInformations)
            .then(response => console.log(response.data))
            .catch(response => console.log(response.data))
    }

    return(
        <>
            <MyNavBar activepath={'/dashboard'} />
            <Container>
                <Row className={'my-5'}>
                    <h2>Contactez-nous</h2>
                    <Form
                        className={"mt-3"}
                        onSubmit={ handleSubmit }
                    >
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={"firstname"}
                                        value={messageInformations.firstname}
                                        placeholder="Prénom"
                                        onChange={ (e) => handleInput(e.target.value, setMessageInformations, false, "firstname", messageInformations) }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type="lastname"
                                        name={"lastname"}
                                        value={messageInformations.lastname}
                                        placeholder="Nom"
                                        onChange={ (e) => handleInput(e.target.value, setMessageInformations, false, "lastname", messageInformations) }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                                <Form.Label>Adresse e-mail</Form.Label>
                            <Form.Control
                                type="email"
                                name={"email"}
                                value={messageInformations.email}
                                placeholder="nom@example.com"
                                onChange={ (e) => handleInput(e.target.value, setMessageInformations, false, "email", messageInformations) }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sujet</Form.Label>
                            <Form.Control
                                type="text"
                                name={"subject"}
                                value={messageInformations.subject}
                                placeholder="Sujet"
                                onChange={ (e) => handleInput(e.target.value, setMessageInformations, false, "subject", messageInformations) }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name={"content"}
                                value={messageInformations.content}
                                placeholder="Message"
                                onChange={ (e) => handleInput(e.target.value, setMessageInformations, false, "content", messageInformations) }
                            />
                        </Form.Group>
                        <Button
                            type={"submit"}
                            variant="light"
                        >
                            Envoyer
                        </Button>
                    </Form>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Contact;