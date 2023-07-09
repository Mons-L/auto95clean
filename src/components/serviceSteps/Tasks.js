import {Col, Form, FormControl, Row} from "react-bootstrap";

const Tasks = (props) => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Composez votre formule</h3>
            <Row className={"justify-content-center"}>
                {
                    props.availableTasks.map(task => {
                        return(
                            <>
                                <Col md={5} className={"d-flex px-2 border-bottom me-5 my-2"}>
                                    <Form.Check
                                        key={"task-"+task.id}
                                        type="checkbox"
                                        id={"task-"+task.id}
                                        checked={props.selectedTasks.indexOf(task.id) !== -1}
                                        label={task.label}
                                        onChange={(e) => {
                                            if(props.selectedTasks.indexOf(task.id) !== -1)
                                                props.saveChoice(props.selectedTasks.filter(item => item !== task.id))
                                            else
                                                props.saveChoice([...props.selectedTasks, task.id])
                                        }}
                                    />
                                    <p className={"ms-auto"}>{task.price.toLocaleString()} €</p>
                                </Col>
                            </>


                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default Tasks