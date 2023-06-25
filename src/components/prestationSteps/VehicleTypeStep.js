import {Col, Image, Row} from "react-bootstrap";

const VehicleTypeStep = props => {

    return(
        <Row>
            <h2>Choisissez votre type de vehicule</h2>
            <Row className={"justify-content-center"}>
                {
                    props.vehicleTypes.map(vehicleType => {
                        return(
                            <Col
                                key={"vehicle-type-"+ vehicleType.value}
                                xl={2}
                                role={"button"}
                                className={"border rounded-3 border-3 m-2 p-3"}
                                onClick={() => props.saveChoice(vehicleType.value)}
                            >
                                <Image src={vehicleType.icon.src} />
                                <h3>{vehicleType.displayName}</h3>
                                <p>Smart, Clio 3, Fiat 500, Twingo, Aygo, Polo ...</p>
                            </Col>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default VehicleTypeStep