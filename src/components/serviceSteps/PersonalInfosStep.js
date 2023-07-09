import {
    Button,
    Col,
    FormControl,
    FormGroup,
    Row
} from "react-bootstrap";
import {handleInput} from "../../utils";

const PersonalInfosStep = (props) => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Renseignez vos informations personnelles</h3>
            <Row className={"justify-content-center"}>
                <Col
                    xl={6}
                    role={"button"}
                    className={"border rounded-3 border-3 m-3 p-3 text-center"}
                >
                    <FormGroup>
                        <FormControl
                            type={"email"}
                            placeholder={"Adresse e-mail"}
                            className={"mb-4"}
                            value={props.inputs.email}
                            onChange={(e) =>
                                handleInput(e.target.value,props.setInputs, false, "email", props.inputs)}
                        />
                        <FormControl
                            type={"text"}
                            placeholder={"Numéro de téléphone"}
                            className={"mb-4"}
                            value={props.inputs.phone}
                            onChange={(e) =>
                                handleInput(e.target.value,props.setInputs, false, "phone", props.inputs)}
                        />
                        <FormControl
                            type={"text"}
                            placeholder={"Immatriculation du véhicule"}
                            className={"mb-4"}
                            value={props.inputs.immatriculation}
                            onChange={(e) =>
                                handleInput(e.target.value,props.setInputs, false, "immatriculation", props.inputs)}
                        />
                        <Button onClick={props.handleBook}>Reserver maintenant</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Row>

    )
}

export default PersonalInfosStep