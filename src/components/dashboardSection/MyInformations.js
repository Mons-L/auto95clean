import {
    Col,
    Row
} from "react-bootstrap";

import Form from 'react-bootstrap/Form';

const client = {
    id: 1,
    firstName: "Salma",
    lastName: "BENCHELKHA",
    email: "salmabenchelkha@gmail.com",
    password: "*********",
    phone: "07 89 78 46 32",
    birthday: new Date(2018, 8, 22)

}


const MyInformations = props => {
    return(
        <Row>
            <h3>Mes informations personnelles</h3>
            <Row className={"justify-content-center"}>
                <Col>
                    <Form className={"m-3"}>
                        <Form.Group className={"d-flex m-4"}>
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Prénom</span>
                            </Form.FloatingLabel>
                            <Form.Control
                                type={"firstname"}
                                className={"me-4"}
                                value={client.firstName}
                            />
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Nom</span>
                            </Form.FloatingLabel>
                            <Form.Control type={"lastname"} value={client.lastName} />
                        </Form.Group>

                        <Form.Group className={"d-flex m-4"}>
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Adresse e-mail</span>
                            </Form.FloatingLabel>
                            <Form.Control
                                type={"email"}
                                className={"me-4"}
                                placeholder={client.email}
                            />
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Mot de passe</span>
                            </Form.FloatingLabel>
                            <Form.Control type={"password"} placeholder={client.password} />
                        </Form.Group>
                        
                        <Form.Group className={"d-flex m-4"}>
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Numéro de téléphone</span>
                            </Form.FloatingLabel>
                            <Form.Control
                                type={"phone"}
                                placeholder={client.phone}
                            />
                        </Form.Group>

                        <Form.Group className={"d-flex m-4"}>
                            <Form.FloatingLabel label={""}>
                                <span className="input-group-text">Date de naissance</span>
                            </Form.FloatingLabel>
                            <Form.Control
                                type={"date"}
                                value={client.birthday}
                            />
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Row>
    )
}

export default MyInformations