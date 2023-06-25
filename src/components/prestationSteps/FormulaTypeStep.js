import {Button, Col, Row} from "react-bootstrap";

const FormulaTypeStep = (props) => {

    return(
        <Row>
            <Row className={"my-5"}>
                <Col className={"justify-content-center d-flex"}>
                    <Button
                        variant={"light"}
                        className={"px-5 py-3 border border-3"}
                        onClick={() => props.saveChoice(props.formulaTypes[0].value)}
                    >
                        {props.formulaTypes[0].displayName}
                    </Button>
                </Col>

            </Row>
            <Row className={"justify-content-center"}>Ou</Row>
            <Row className={"my-5"}>
                <Col className={"justify-content-center d-flex"}>
                    <Button
                        variant={"light"}
                        className={"px-5 py-3 border border-3"}
                        onClick={() => props.saveChoice(props.formulaTypes[1].value)}
                    >
                        {props.formulaTypes[1].displayName}
                    </Button>
                </Col>
            </Row>
        </Row>
    )
}

export default FormulaTypeStep