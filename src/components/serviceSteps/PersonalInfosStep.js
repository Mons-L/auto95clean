import {
    Col,
    FormControl,
    FormGroup,
    Row
} from "react-bootstrap";

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
                        />
                        <FormControl
                            type={"text"}
                            placeholder={"Numéro de téléphone"}
                            className={"mb-4"}
                        />
                        <FormControl
                            type={"text"}
                            placeholder={"Immatriculation du véhicule"}
                            className={"mb-4"}
                        />
                    </FormGroup>
                    <Row>
                        <Col
                            role={"button"}
                            className={"border rounded-3 border-3 m-1 text-center choiceBackground"}
                        >
                            Réserver et payer sur place
                        </Col>
                        <Col
                            role={"button"}
                            className={"border rounded-3 border-3 m-1 text-center choiceBackground"}
                        >
                            Réserver et payer maintenant
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>

    )
}

export default PersonalInfosStep