import {
    Button,
    Col,
    Form,
    Row
} from "react-bootstrap";
import Link from "next/link";
import global from "../../pagesPath";
import LeftArrow from "../../resources/icons/LeftArrow";

const RegisterForm = (props) => {
    return(
        <>
            <Row className={"my-3 my-sm-4"}>
                <Button variant={"link"} onClick={props.setSelectedTab}  className={"d-flex align-items-center text-decoration-none color-black"}>
                    <LeftArrow className={"d-flex"} fill={"black"} />
                    <p className={"m-0 ms-2 color-black"}>Retour vers la page de connexion</p>
                </Button>
            </Row>
            <h2>Inscription</h2>
            <Form
                className={"mt-3"}
                onSubmit={props.onSubmit}
            >
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name={"firstname"}
                                value={props.registerInformations.firstname}
                                placeholder="Prénom"
                                onChange={(e) => props.handleOnChangeInput(e, "firstname")}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="lastname"
                                name={"lastname"}
                                value={props.registerInformations.lastname}
                                placeholder="Nom"
                                onChange={(e) => props.handleOnChangeInput(e, "lastname")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name={"email"}
                        value={props.registerInformations.email}
                        placeholder="nom@example.com"
                        onChange={(e) => props.handleOnChangeInput(e, "email")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name={"password"}
                        value={props.registerInformations.password}
                        placeholder="Mot de passe"
                        onChange={(e) => props.handleOnChangeInput(e, "password")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name={"confirmPassword"}
                        value={props.registerInformations.confirmedPassword}
                        placeholder="Confirmer le mot de passe"
                        onChange={(e) => props.handleOnChangeInput(e, "confirmPassword")}
                    />
                </Form.Group>
                <Button
                    type={"submit"}
                    variant="light"
                >
                    S&apos;inscrire
                </Button>
            </Form>
        </>
    )
}

export default RegisterForm