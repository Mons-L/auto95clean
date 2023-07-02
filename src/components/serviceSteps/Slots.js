import {
    Col,
    Image,
    Row
} from "react-bootstrap";

import arrow from "../../../public/images/icones/arrow.svg"

const days = [
    {
        date: '2023-07-10',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-11',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-12',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-13',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-14',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-15',
        slots: [
            {startDate: '2023-07-10T09:00', endDate: '2023-07-15T10:00', availability: "yes"},
            {startDate: '2023-07-10T10:00', endDate: '2023-07-15T12:00', availability: "no"},
            {startDate: '2023-07-13T09:00', endDate: '2023-07-15T14:00', availability: "yes"},
            {startDate: '2023-07-10T14:00', endDate: '2023-07-15T16:00', availability: "no"}
        ]
    },
    {
        date: '2023-07-16', slots: []
    }
]

const Slots = (props) => {
    return(
        <Row className={"stepBackground mb-5"}>
            <h3 className={"mt-3"}>Choisissez un créneau</h3>
            <Row className={"justify-content-center m-auto"}>
                <Col>
                    <Image style={{ transform: "rotate(180deg" }} type={"button"}  width={"50%"} src={arrow.src}/>
                </Col>
                <Col md={11}>
                    <Row>
                        {
                            days.map(day => {
                                return(
                                    <Col key={"day"+day.date}>
                                        <Row className={"justify-content-center fw-bold"}>{ new Date(day.date).toLocaleDateString(navigator.language, {weekday: "long"}) }</Row>
                                        <Row className={"justify-content-center"}>{ new Date(day.date).toLocaleDateString(navigator.language, {day: "2-digit", month: "long"}) }</Row>
                                        {
                                            day.slots && day.slots.map(slot => {
                                                return(
                                                    <div
                                                        key={"slot-" + slot}
                                                        type={"button"}
                                                        className={(
                                                            (props.selectedSlot === slot && slot.availability === "yes" ? "choosedBackground " : "") +
                                                            (props.selectedSlot !== slot && slot.availability === "yes" ? "bg-light " : "") +
                                                            (slot.availability === "no" ? "text-decoration-line-through disabled bg-light" : "")
                                                        )}
                                                        onClick={() => props.saveChoice(slot)}
                                                    >
                                                        <Row className={"justify-content-center pt-1 mt-3 pb-1"}>
                                                            {new Date(slot.startDate).toLocaleTimeString(navigator.language, {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}
                                                        </Row>
                                                        <Row className={"justify-content-center pt-1 pb-1 mb-3"}>
                                                            {new Date(slot.endDate).toLocaleTimeString(navigator.language, {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col>
                    <Image type={"button"}  width={"50%"} src={arrow.src}/>
                </Col>
            </Row>
        </Row>
    )
}

export default Slots