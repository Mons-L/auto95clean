import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

const RegisterForm = (props) => {
    return(
        <Form onSubmit={props.handleSubmit}>
            <FormGroup>
                <FormControl
                    type={"text"}
                    id={'firstname'}
                    placeholder={"Prénom"}
                />

                <FormControl
                    type={"text"}
                    id={'lastname'}
                    placeholder={"Nom"}
                />
            </FormGroup>


            <FormControl
                type={"email"}
                id={'username'}
                placeholder={"Adresse e-mail"}
            />

            <FormGroup>
                <FormControl
                    type={"password"}
                    id={'password'}
                    placeholder={"Mot de passe"}
                />
                <FormControl
                    type={"password"}
                    id={'confirmPassword'}
                    placeholder={"Confirmer le mot de passe"}
                />
            </FormGroup>

            <FormControl
                type={"text"}
                id={'phone'}
                placeholder={"Téléphone"}
            />

            <p>Vous avez déjà un compte ? <a href={"./"}>Se connecter</a></p>
            <Button type={"submit"}>Se connecter</Button>
        </Form>

    )
}

export default RegisterForm