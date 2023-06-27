import {
    Col,
    Row
} from "react-bootstrap";

const FORMULA_TYPE_READY_ID = 1
const TASK_TYPE_INDOOR = "Intérieur"
const TASK_TYPE_OUTDOOR = "Extérieur"

const FormulaChoiceStep = (props) => {
    return(
        props.formulaType.id === FORMULA_TYPE_READY_ID ?
            <Row className={"stepBackground mb-5"}>
                <h3 className={"mt-3"}>Quelle formule souhaitez-vous ?</h3>
                <Row className={"justify-content-center"}>
                    {
                        props.formulas.map(formula => {
                            return(
                                <Col
                                    key={"formula-"+formula.id}
                                    xl={3}
                                    role={"button"}
                                    className={"border rounded-3 border-3 m-5 p-3 text-center choiceBackground"}
                                    onClick={() => props.saveChoice("formula", formula.label)}
                                >
                                    <h3>{formula.label}</h3>
                                    <p className={"fw-bold"}>{formula.price}€</p>
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
        :
            <Row className={"stepBackground mb-5"}>
                <h3 className={"mt-3"}>Composez votre formule</h3>
                <Row className={"justify-content-center"}>
                    {
                        props.tasks.map(task => {
                            return(
                                <Row
                                    key={"task-"+task.id}
                                    xl={12}
                                    className={"border rounded-3 border-3 d-flex text-center"}
                                >
                                    <label>{task.label + task.price} </label>
                                    <input
                                        type="checkbox"
                                        id={"task-"+task.id}
                                        onClick={() => props.saveChoice("task", task.label)}
                                    />
                                </Row>
                            )
                        })
                    }
                </Row>
            </Row>
        )
    }

export default FormulaChoiceStep