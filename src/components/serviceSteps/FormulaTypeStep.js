import {
    Col,
    Row
} from "react-bootstrap";

const FormulaTypeStep = (props) => {

    return(
        <Row className={"stepBackground mb-5 "}>
            <h3 className={"mt-3"}>Quel type de formule souhaitez-vous ?</h3>
            <Row className={"justify-content-center"}>
                <Col
                    xl={3}
                    role={"button"}
                    onClick={() => props.saveChoice(props.formulaTypes[0].value)}
                    className={"border rounded-3 border-3 m-5 p-3 text-center choiceBackground"}
                >
                    {props.formulaTypes[0].displayName}
                </Col>
                <Col className={"m-5 p-3 text-center"}>
                    ou
                </Col>
                <Col
                    xl={3}
                    role={"button"}
                    onClick={() => props.saveChoice(props.formulaTypes[1].value)}
                    className={"border rounded-3 border-3 m-5 p-3 text-center choiceBackground"}
                >
                    {props.formulaTypes[1].displayName}
                </Col>
            </Row>
        </Row>
    )
}

export default FormulaTypeStep