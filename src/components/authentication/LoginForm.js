import {
    Button,
    Form,
} from "react-bootstrap";

import global from '../../pagesPath'

const LoginForm = (props) => {
    return(
        <>
            <h2>Connectez-vous</h2>
            <Form
                className={"mt-3"}
                onSubmit={props.onSubmit}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name={"email"}
                        value={props.loginCredentials.email}
                        placeholder="nom@example.com"
                        onChange={(e) => props.handleOnChangeInput(e, 'email')}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name={"Mot de passe"}
                        value={props.loginCredentials.password}
                        placeholder="Mot de passe"
                        onChange={(e) => props.handleOnChangeInput(e, 'password')}
                    />
                </Form.Group>
                <a href={'./'}><p>Mot de passe oublié</p></a>
                <p>Vous n'avez pas de compte ?
                    <Button onClick={ props.setSelectedTab }>
                        Créez-en un
                    </Button>
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