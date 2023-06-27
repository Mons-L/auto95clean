import apiHandler from "../apiHandler";

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

const Services = props => {

    const [mounted, setMounted] = useState(false)

    const [vehicleType, setVehicleType] = useState(null)
    const [formulaType, setFormulaType] = useState(null)
    const [formulaChoice, setFormulaChoice] = useState(null)
    const [personalInfos, setPersonalInfos] = useState(null)
    const [formulasPrices, setFormulasPrices] = useState(null)


    useEffect(() => {
        setMounted(true)
        if(vehicleType)
            apiHandler.fetchFormulasPrices(vehicleType.id).then(response => setFormulasPrices(response.data.formulasPrices)).catch(err => console.log(err))
    }, [])

    const renderSteps = () => {
        return (
            <>
                <VehicleTypeStep
                    key={"step-reservationInfos"}
                    vehiclesTypes={props.vehiclesTypes}
                    currentVehicleType={vehicleType}
                    saveChoice={setVehicleType}
                />
                { vehicleType &&
                    <FormulaTypeStep
                        key={"step-formulaType"}
                        formulasTypes={props.formulasTypes}
                        currentFormulaType={formulaType}
                        saveChoice={setFormulaType}
                    />
                }
                {
                    formulaType &&
                    <FormulaChoiceStep
                        key={"step-formulaChoice"}
                        formulas={props.formulas}
                        formulaType={formulaType}
                        formulaChoice={props.formulaChoice}
                        currentFormulaChoice={formulaChoice}
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

export async function getStaticProps() {
    const vehiclesTypes = await apiHandler.fetchVehiclesTypes().then(response => response.data.vehiclesTypes).catch(err => console.log(err))
    const formulasTypes = await apiHandler.fetchFormulasTypes().then(response => response.data.formulasTypes).catch(err => console.log(err))
    const formulas = await apiHandler.fetchFormulasFullInformations().then(response => response.data.formulas).catch(err => console.log(err))
    const tasks = await apiHandler.fetchTasks().then(response => response.data.tasks).catch(err => console.log(err))

    return {
        props: {
            vehiclesTypes: vehiclesTypes,
            formulasTypes: formulasTypes,
            formulas: formulas,
            tasks: tasks
        }
    }

}