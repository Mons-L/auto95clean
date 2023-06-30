import {Row} from "react-bootstrap";

const Tasks = (props) => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Composez votre formule</h3>
            <Row className={"justify-content-center"}>
                {
                    props.availableTasks.map(task => {
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
                                    onClick={() => props.saveChoice([...props.selectedTasks, task.id])}
                                />
                            </Row>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default Tasks