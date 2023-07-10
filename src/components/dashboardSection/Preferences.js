import {
    Col,
    Row
} from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import {useState} from "react";

const Preferences = props => {

    const [selectedLanguage, setSelectedLanguage] = useState("Français")

    return(
        <Row>
            <h3>Mes préférences</h3>
            <Row className={"justify-content-center"}>
                <Col>
                    <Form className={"mb-4"}>
                        <Row className={"mt-4"}>
                            <Col>
                                <Form.Label>Paramètres de confidentialité</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Visibilité de votre profil"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Préférences de partage d'information"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Autorisation d'accès à vos données"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Notifications</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Mail"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Téléphone"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Push"
                                />
                            </Col>
                        </Row>
                        <Row className={"mt-4"}>
                            <Col>
                                <Form.Label>Confidentialité des cookies</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Acceptation des cookies"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Blocage des cookies"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Préférences linguistique</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Français"
                                    checked={selectedLanguage === "Français"}
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Anglais"
                                    checked={selectedLanguage === "Anglais"}
                                />
                            </Col>
                        </Row>
                        <Row className={"mt-4"}>
                            <Col>
                                <Form.Label>Personnalisation de l&apos;interface</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Sombre"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Row>
    )
}

export default Preferences