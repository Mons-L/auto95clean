import {
    Button,
    Form,
} from "react-bootstrap";

import {
    handleInput
} from "../../utils";

const LoginForm = (props) => {
    return(
        <>
            <h2>Connectez-vous</h2>
            <Form
                className={"mt-3"}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name={"email"}
                        value={props.loginCredentials.email}
                        placeholder="nom@example.com"
                        onChange={(e) => handleInput(
                            e.target.value,
                            props.setLoginCredentials,
                            false,
                            "email",
                            props.loginCredentials)
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="text"
                        name={"Mot de passe"}
                        value={props.loginCredentials.password}
                        placeholder="Mot de passe"
                        onChange={(e) => handleInput(
                            e.target.value,
                            props.setLoginCredentials,
                            false,
                            "subject",
                            props.loginCredentials)
                        }
                    />
                </Form.Group>
                <a href={"./"}><p>Mot de passe oublié</p></a>
                <p>Vous n'avez pas de compte ? <a
                        href={"./"}
                        onClick={ props.setSelectedTab }
                    >
                        Créez-en un
                    </a>
                </p>
                <Button
                    type={"submit"}
                    variant="light"
                >
                    Se connecter
                </Button>
            </Form>
        </>
    )
}

export default LoginForm