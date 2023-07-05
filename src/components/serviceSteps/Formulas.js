import {
    Col,
    Row
} from "react-bootstrap";

const TASK_TYPE_INDOOR = "Intérieur"
const TASK_TYPE_OUTDOOR = "Extérieur"

const Formulas = (props) => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Quelle formule souhaitez-vous ?</h3>
            <Row className={"justify-content-around p-3 pb-5"}>
                {
                    props.formulas.map(formula => {
                        return(
                            <Col
                                key={"formula-"+formula.id}
                                xl={3}
                                role={"button"}
                                className={"border rounded-3 border-3  p-3 text-center choiceBackground" + (props.selectedFormula && props.selectedFormula.id === formula.id ? " choosedBackground" : "")}
                                onClick={() => props.saveChoice(formula)}
                            >
                                <h3>{formula.label}</h3>
                                <p className={"fw-bold"}>{props.formulasPrices.find(item => item.formulaId === formula.id).price}€</p>
                                <p className={"font-size-14 fst-italic"}>
                                    Intérieur : {
                                        formula.tasks.filter(task => task.type === TASK_TYPE_INDOOR).map(task => task.label).join(", ")
                                    }
                                </p>
                                <p className={"font-size-14 fst-italic"}>
                                    Extérieur : {
                                    formula.tasks.filter(task => task.type === TASK_TYPE_OUTDOOR).map(task => task.label).join(", ")
                                }
                                </p>
                            </Col>
                        )
                    })
                }
            </Row>
        </Row>
        )
    }

export default Formulas