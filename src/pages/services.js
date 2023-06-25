import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import car from "../resources/images/icones/car.svg";
import {useEffect, useState} from "react";
import VehicleTypeStep from "../components/prestationSteps/VehicleTypeStep";
import {useRouter} from "next/navigation";
import {queryTypes, useQueryState, useQueryStates} from "next-usequerystate";
import FormulaTypeStep from "../components/prestationSteps/FormulaTypeStep";
import FormulaChoiceStep from "../components/prestationSteps/FormulaChoiceStep";
import PersonalInfosStep from "../components/prestationSteps/PersonalInfosStep";

const vehicleTypes = [
    {displayName: "Petit", value: "small", icon: car},
    {displayName: "Moyen", value: "medium", icon: car},
    {displayName: "Grand", value: "big", icon: car}
]

const formulaTypes = [
    {displayName: "Je choisis une formule existante", value: "existante"},
    {displayName: "Je compose ma formule", value: "perso"}
]

const Services = props => {

    const [mounted, setMounted] = useState(false)
    const [reservationInfos, setReservationInfos] = useQueryStates(
        {
            "vehicle-type": queryTypes.stringEnum(vehicleTypes.map(vehicleType => vehicleType.value)).withDefault(0),
            "formula-type": queryTypes.stringEnum(["perso", "existante"]),
            "formula": queryTypes.stringEnum(["form1", "form2", "form3"]),
            "tasks": queryTypes.array(queryTypes.string)
        },
        {history: 'push'}
    );

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderSummary = () => {
        const vehicleType = vehicleTypes
            .find(vehicleType => vehicleType.value===reservationInfos["vehicle-type"])

        const formulaType = formulaTypes
            .find(formulaType => formulaType.value===reservationInfos["formula-type"])

        if(vehicleType)
            return(
                <Row>
                    <Col>
                        {<Image src={vehicleType.icon.src} width={50} alt={"vehicle type icon"} /> }
                        {formulaType && <p className={"d-inline-block"}>{formulaType.displayName}</p> }
                    </Col>
                </Row>
            )
    }

    const renderStep = () => {
        let step = null

        if(!reservationInfos["vehicle-type"])
            step = 0
        else if(!reservationInfos["formula-type"])
            step = 1
        else if(!reservationInfos["formula"] && !reservationInfos["tasks"])
            step = 2
        else
            step = 3

        return steps[step]? steps[step] : <div>Something went wrong!</div>
    }

    const saveChoice = async (key, value) => {
        await setReservationInfos({...reservationInfos, [key]: value})
    }


    const steps = [
        <VehicleTypeStep
            key={"step-reservationInfos"}
            vehicleTypes={vehicleTypes}
            saveChoice={(value) => saveChoice("vehicle-type", value)}
        />,
        <FormulaTypeStep
            key={"step-formulaType"}
            formulaTypes={formulaTypes}
            saveChoice={(value) => saveChoice("formula-type", value)}
        />,
        <FormulaChoiceStep
            key={"step-formulaChoice"}
            formulaType={reservationInfos["formula-type"]}
            saveChoice={saveChoice}
        />,
        <PersonalInfosStep key={"step-personalInfos"} />
    ]

    return(
        <>
            <MyNavBar activepath={'/services'} />
            <Container>
                <Row>
                    <h1>Prestations</h1>
                    {mounted? renderSummary() : <div>Its loading</div>}
                    {mounted? renderStep() : <div>Its loading</div>}
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Services;