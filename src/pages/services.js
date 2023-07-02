import apiHandler from "../apiHandler";

import Footer from "../components/footer/Footer";
import MyNavBar from "../components/mynavbar/MyNavBar";
import VehicleType from "../components/serviceSteps/VehiclesTypes";
import FormulaType from "../components/serviceSteps/FormulasTypes";
import Formula from "../components/serviceSteps/Formulas";
import PersonalInfosStep from "../components/serviceSteps/PersonalInfosStep";

import {
    useEffect,
    useState
} from "react";

import {
    Container,
    Row
} from "react-bootstrap";
import Tasks from "../components/serviceSteps/Tasks";
import Slots from "../components/serviceSteps/Slots";
const FORMULA_TYPE_READY_ID = 1
const FORMULA_TYPE_CUSTOM_ID = 2

const Services = props => {

    const [selectedVehicleType, setSelectedVehicleType] = useState(null)
    const [selectedFormulaType, setSelectedFormulaType] = useState(null)
    const [selectedFormula, setSelectedFormula] = useState(null)
    const [formulasPrices, setFormulasPrices] = useState(null)
    const [availableTasks, setAvailableTasks] = useState(null)
    const [selectedTasks, setSelectedTasks] = useState([])
    const [availableSlots, setAvailableSlots] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [personalInfos, setPersonalInfos] = useState(null)

    useEffect(() => {
        if(selectedVehicleType)
            apiHandler
                .fetchFormulasPrices(selectedVehicleType.id)
                .then(response => setFormulasPrices(response.data.formulasPrices))
                .catch(err => console.log(err))
    }, [selectedVehicleType])

    useEffect(() => {
        if(selectedFormulaType) {
            apiHandler
                .fetchTasks()
                .then(response => setAvailableTasks(response.data.tasks))
                .catch(err => console.log(err))
            setSelectedTasks([])
            setSelectedFormula(null)
        }
    }, [selectedFormulaType])

    const renderError = () => {
        return(
            <div>
                Quelque chose n'a pas fonctionné correctement.
                Réessayez dans quelques instants. Si le problème persiste, veillez contacter
                l'administrateur du site
            </div>
        )
    }
    const renderSteps = () => {
        return (
            <>
                {
                    props.vehiclesTypes?
                        <VehicleType
                            key={"step-selectedVehicleType"}
                            vehiclesTypes={props.vehiclesTypes}
                            selectedVehicleType={selectedVehicleType}
                            saveChoice={setSelectedVehicleType}
                        />
                    :
                        renderError()
                }
                {   !props.formulasTypes?
                        renderError()
                    :
                        selectedVehicleType &&
                        <FormulaType
                            key={"step-selectedFormulaType"}
                            formulasTypes={props.formulasTypes}
                            selectedFormulaType={selectedFormulaType}
                            saveChoice={setSelectedFormulaType}
                        />
                }
                {
                    selectedFormulaType && selectedFormulaType.id === FORMULA_TYPE_READY_ID &&
                    <Formula
                        key={"step-selectedFormula"}
                        formulas={props.formulas}
                        selectedFormula={selectedFormula}
                        formulasPrices={formulasPrices}
                        saveChoice={setSelectedFormula}
                    />
                }
                {
                    selectedFormulaType && selectedFormulaType.id === FORMULA_TYPE_CUSTOM_ID &&
                    <Tasks
                        key={"step-tasksChoice"}
                        availableTasks={availableTasks}
                        selectedTasks={selectedTasks}
                        saveChoice={setSelectedTasks}
                    />
                }
                {
                    (
                        (selectedFormula && selectedFormulaType.id === FORMULA_TYPE_READY_ID)
                        || (selectedTasks && selectedTasks.length>0 && selectedFormulaType && selectedFormulaType.id === FORMULA_TYPE_CUSTOM_ID )
                    )
                    &&
                    <Slots
                        key={"step-slotChoice"}
                        selectedSlot={selectedSlot}
                        saveChoice={setSelectedSlot}
                    />
                }
                {
                    (
                        (selectedFormula && selectedFormulaType.id === FORMULA_TYPE_READY_ID)
                        || (selectedTasks && selectedTasks.length>0 && selectedFormulaType && selectedFormulaType.id === FORMULA_TYPE_CUSTOM_ID )
                    )
                    &&
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
                    {renderSteps()}
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