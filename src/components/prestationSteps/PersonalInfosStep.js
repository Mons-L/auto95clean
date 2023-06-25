import {Button, Col, FormControl, FormGroup, FormText, Row} from "react-bootstrap";
import PaymentForm from "../PaymentForm";
import StripeContainer from "../StripeContainer";

const PersonalInfosStep = (props) => {
    return(
        <Row>
            <Col>
                <FormGroup>
                    <p>Information personnelle</p>
                    <FormControl
                        type={"email"}
                        placeholder={"email"}
                    />
                    <FormControl
                        type={"text"}
                        placeholder={"phone"}
                    />
                    <FormControl
                        type={"text"}
                        placeholder={"Immatriculation"}
                    />
                </FormGroup>
                <FormGroup>
                    <p>Information de paiement</p>

                    <StripeContainer />
                </FormGroup>
                <Button>Valider le paiement</Button>
            </Col>
        </Row>
    )
}

export default PersonalInfosStep