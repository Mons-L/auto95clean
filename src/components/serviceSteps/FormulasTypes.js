import {
    Col,
    Row
} from "react-bootstrap";

const FormulasTypes = (props) => {
    return(
        <Row className={"stepBackground mb-5 "}>
            <h3 className={"mt-3"}>Quel type de formule souhaitez-vous ?</h3>
            <Row className={"justify-content-center"}>
                {
                    props.formulasTypes.map(formulaType => {
                        return(
                            <Col
                                key={"formula-type-"+ formulaType.id}
                                xl={3}
                                role={"button"}
                                onClick={() => props.saveChoice(formulaType)}
                                className={"border rounded-3 border-3 m-5 p-3 text-center choiceBackground" + (props.selectedFormulaType && props.selectedFormulaType.id === formulaType.id ? " choosedBackground" : "")}
                            >
                                {formulaType.label}
                            </Col>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default FormulasTypes