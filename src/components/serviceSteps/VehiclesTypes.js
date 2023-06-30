import {
    Col,
    Image,
    Row
} from "react-bootstrap";

const VehiclesTypes = props => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Quel est votre type de véhicule ?</h3>
            <Row className={"justify-content-center"}>
                {
                    props.vehiclesTypes.map(vehicleType => {
                        return(
                            <Col
                                key={"vehicle-type-"+ vehicleType.id}
                                xl={2}
                                role={"button"}
                                className={"border rounded-3 border-3 m-5 p-2 text-center choiceBackground" + (props.selectedVehicleType && props.selectedVehicleType.id === vehicleType.id ? " choosedBackground" : "")}
                                onClick={() => props.saveChoice(vehicleType)}
                            >
                                <h3 className={"font-size-15 mb-4"}>{vehicleType.label}</h3>
                                <Image className={"mb-4"} width={"50%"} src={vehicleType.imagePath}/>
                                <p className={"font-size-14 fst-italic"}>Exemple : {vehicleType.description}</p>
                            </Col>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default VehiclesTypes