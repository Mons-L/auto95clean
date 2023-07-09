import { Col, FloatingLabel, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { handleInput } from "../../utils";
import {useEffect, useState} from "react";

let client = {
    id: 1,
    firstName: "Salma",
    lastName: "BENCHELKHA",
    email: "salmabenchelkha@gmail.com",
    password: "*********",
    phone: "07 89 78 46 32",
    birthday: "2000-07-08"
}

const PersonalInformations = props => {

    const [informations, setInformations] = useState("")

    if(props.user.role === "ADMIN")
        client = {
            id: 2,
            firstName: "Mouncif",
            lastName: "LEKMITI",
            email: "mouncif@admin.com",
            password: "*********",
            phone: "07 53 59 76 70",
            birthday: "2000-11-25"
        }

    return(
        <Row>
            <h3>Mes informations personnelles</h3>
            <Row className={"justify-content-center"}>
                <Col className={"mb-5"}>
                    <FloatingLabel label={"Prénom"} className={"mt-3"}>
                        <Form.Control
                            value={client.firstName}
                            placeholder="Prénom"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "firstname", informations)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label={"Nom"} className={"mt-3"}>
                        <Form.Control
                            value={client.lastName}
                            placeholder="Nom"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "lastname", informations)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label={"Adresse mail"} className={"mt-3"}>
                        <Form.Control
                            value={client.email}
                            placeholder="Adresse mail"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "email", informations)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label={"Mot de passe"} className={"mt-3"}>
                        <Form.Control
                            value={client.password}
                            placeholder="Mot de passe"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "password", informations)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label={"Numéro de téléphone"} className={"mt-3"}>
                        <Form.Control
                            value={client.phone}
                            placeholder="Numéro de téléphone"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "phone", informations)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label={"Date de naissance"} className={"mt-3"}>
                        <Form.Control
                            type={"date"}
                            value={client.birthday}
                            placeholder="Adresse mail"
                            onChange={(event) =>
                                handleInput(event.target.value, setInformations, false, "birthday", informations)}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Row>
    )
}

export default PersonalInformations