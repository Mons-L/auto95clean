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
            {start: '2023-07-10T08:00', end: '2023-07-10T10:00', availability: "yes"},
            {start: '2023-07-10T10:00', end: '2023-07-10T12:00', availability: "no"},
            {start: '2023-07-10T13:00', end: '2023-07-10T15:00', availability: "yes"},
            {start: '2023-07-10T15:00', end: '2023-07-10T17:00', availability: "yes"}

        ]
    },
    {
        date: '2023-07-11',
        slots: [
            {start: '2023-07-11T08:00', end: '2023-07-11T10:00', availability: "yes"},
            {start: '2023-07-11T10:00', end: '2023-07-11T12:00', availability: "yes"},
            {start: '2023-07-11T13:00', end: '2023-07-11T15:00', availability: "yes"},
            {start: '2023-07-11T15:00', end: '2023-07-11T17:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-12',
        slots: [
            {start: '2023-07-12T08:00', end: '2023-07-12T10:00', availability: "no"},
            {start: '2023-07-12T10:00', end: '2023-07-12T12:00', availability: "yes"},
            {start: '2023-07-12T13:00', end: '2023-07-12T15:00', availability: "no"},
            {start: '2023-07-12T14:00', end: '2023-07-12T17:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-13',
        slots: [
            {start: '2023-07-13T08:00', end: '2023-07-13T10:00', availability: "yes"},
            {start: '2023-07-13T10:00', end: '2023-07-13T12:00', availability: "yes"},
            {start: '2023-07-13T13:00', end: '2023-07-13T15:00', availability: "yes"},
            {start: '2023-07-13T15:00', end: '2023-07-13T17:00', availability: "yes"}

        ]
    },
    {
        date: '2023-07-14',
        slots: [
            {start: '2023-07-14T08:00', end: '2023-07-14T10:00', availability: "yes"},
            {start: '2023-07-14T10:00', end: '2023-07-14T12:00', availability: "no"},
            {start: '2023-07-14T13:00', end: '2023-07-14T15:00', availability: "no"},
            {start: '2023-07-14T15:00', end: '2023-07-14T17:00', availability: "no"}

        ]
    },
    {
        date: '2023-07-15',
        slots: [
            {start: '2023-07-15T08:00', end: '2023-07-15T10:00', availability: "yes"},
            {start: '2023-07-15T10:00', end: '2023-07-15T12:00', availability: "yes"},
            {start: '2023-07-15T13:00', end: '2023-07-15T15:00', availability: "yes"},
            {start: '2023-07-15T15:00', end: '2023-07-15T17:00', availability: "yes"}
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
                                            day.slots && day.slots.map((slot, index) => {
                                                return(
                                                    <div
                                                        key={"slot-"+index+"-"+ slot}
                                                        role={slot.availability === "yes"? "button": ""}
                                                        className={(
                                                            (props.selectedSlot === slot && slot.availability === "yes" ? "choosedBackground " : "") +
                                                            (props.selectedSlot !== slot && slot.availability === "yes" ? "bg-light " : "") +
                                                            (slot.availability === "no" ? "text-decoration-line-through disabled bg-light" : "")
                                                        )}
                                                        onClick={() => {
                                                            if(slot.availability === "yes")
                                                                props.saveChoice(slot)

                                                            console.log(props.selectedSlot)
                                                        }}
                                                    >
                                                        <Row className={"justify-content-center pt-1 mt-3 pb-1"}>
                                                            {new Date(slot.start).toLocaleTimeString(navigator.language, {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}
                                                        </Row>
                                                        <Row className={"justify-content-center pt-1 pb-1 mb-3"}>
                                                            {new Date(slot.end).toLocaleTimeString(navigator.language, {
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