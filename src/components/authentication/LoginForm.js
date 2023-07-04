import {Button, Form, FormControl} from "react-bootstrap";

const LoginForm = (props) => {
    return(
        <Form onSubmit={props.handleSubmit}>
            <FormControl
                type={"text"}
                id={'username'}
                placeholder={"Adresse e-mail"}
            />

            <FormControl
                type={"password"}
                id={'password'}
                placeholder={"Mot de passe"}
            />
            <a href={"./"}><p>Mot de passe oublié</p></a>
            <p>Vous n'avez pas de compte ? <a href={"./"}>Crééez-en un</a></p>
            <Button type={"submit"}>Se connecter</Button>
        </Form>
    )
}

export default LoginForm