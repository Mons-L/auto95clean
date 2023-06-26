import smallCar from "../../resources/images/icones/car/small.png";
import mediumCar from "../../resources/images/icones/car/medium.png";
import largeCar from "../../resources/images/icones/car/large.png";

import {
    Col,
    Image,
    Row
} from "react-bootstrap";

const vehiclesTypes = [
    {displayName: "Petit", value: "small", description: "Twingo, Smart, Clio 3, Fiat 500, Mini Cooper...", icon: smallCar},
    {displayName: "Moyen", value: "medium", description: "Golf, Ford Focus, Clio 4, Audi A3, Mercedes classe A...", icon: mediumCar},
    {displayName: "Grand", value: "big", description: "Audi Q5, Mercedes GLE, Renault Kadjar, Volkswagen Tiguan...", icon: largeCar}
]

const VehicleTypeStep = props => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Quel est votre type de véhicule ?</h3>
            <Row className={"justify-content-center"}>
                {
                    vehiclesTypes.map(vehicleType => {
                        return(
                            <Col
                                key={"vehicle-type-"+ vehicleType.value}
                                xl={2}
                                role={"button"}
                                className={"border rounded-3 border-3 m-5 p-2 text-center choiceBackground"}
                                onClick={() => props.saveChoice(vehicleType.value)}
                            >
                                <h3 className={"font-size-15 mb-4"}>{vehicleType.displayName}</h3>
                                <Image className={"mb-4"} width={"50%"} src={vehicleType.icon.src} />
                                <p className={"font-size-14 fst-italic"}>Exemple : {vehicleType.description}</p>
                            </Col>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default VehicleTypeStep