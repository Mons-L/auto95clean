import smallCar from "../resources/images/icones/car/small.png";
import mediumCar from "../resources/images/icones/car/medium.png";
import largeCar from "../resources/images/icones/car/large.png";

import Footer from "../components/footer/Footer";
import MyNavBar from "../components/mynavbar/MyNavBar";
import VehicleTypeStep from "../components/serviceSteps/VehicleTypeStep";
import FormulaTypeStep from "../components/serviceSteps/FormulaTypeStep";
import FormulaChoiceStep from "../components/serviceSteps/FormulaChoiceStep";
import PersonalInfosStep from "../components/serviceSteps/PersonalInfosStep";

import {
    useEffect,
    useState
} from "react";

import {
    Container,
    Row
} from "react-bootstrap";



const formulaTypes = [
    {displayName: "Je choisis une formule existante", value: "existante"},
    {displayName: "Je compose ma formule", value: "perso"}
]

const Services = props => {

    const [mounted, setMounted] = useState(false)

    const [vehicleType, setVehicleType] = useState(null)
    const [formulaType, setFormulaType] = useState(null)
    const [formulaChoice, setFormulaChoice] = useState(null)
    const [personalInfos, setPersonalInfos] = useState(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderSteps = () => {
        return (
            <>
                <VehicleTypeStep
                    key={"step-reservationInfos"}
                    saveChoice={setVehicleType}
                />
                { vehicleType &&
                    <FormulaTypeStep
                        key={"step-formulaType"}
                        formulaTypes={formulaTypes}
                        saveChoice={setFormulaType}
                    />
                }
                {
                    formulaType &&
                    <FormulaChoiceStep
                        key={"step-formulaChoice"}
                        formulaType={formulaType}
                        saveChoice={setFormulaChoice}
                    />
                }
                {
                    formulaChoice &&
                    <PersonalInfosStep
                        key={"step-reservationInfos"}
                        saveChoice={setPersonalInfos}
                    />
                }
            </>
        )
    }

    return(
        <>
            <MyNavBar activepath={'/services'} />
            <Container>
                <Row>
                    <h2 className={"mt-5 mb-5"}>Prestations</h2>
                    {mounted? renderSteps() : <div>Its loading</div>}
                </Row>
            </Container>
            <Footer className={"position-sticky"} />
        </>
    )
}

export default Services;