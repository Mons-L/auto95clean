import {
    Button,
    Col,
    Form,
    Row
} from "react-bootstrap";

const RegisterForm = (props) => {
    return(
        <>
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
                                onChange={(e) => props.handleOnChangeInput(e, 'firstname')}
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
                                onChange={(e) => props.handleOnChangeInput(e, 'lastname')}
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
                        onChange={(e) => props.handleOnChangeInput(e, 'email')}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name={"password"}
                        value={props.registerInformations.password}
                        placeholder="Mot de passe"
                        onChange={(e) => props.handleOnChangeInput(e, 'password')}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name={"confirmPassword"}
                        value={props.registerInformations.confirmedPassword}
                        placeholder="Confirmer le mot de passe"
                        onChange={(e) => props.handleOnChangeInput(e, 'confirmPassword')}
                    />
                </Form.Group>
                <Button
                    type={"submit"}
                    variant="light"
                >
                    S'inscrire
                </Button>
            </Form>
        </>
    )
}

export default RegisterForm