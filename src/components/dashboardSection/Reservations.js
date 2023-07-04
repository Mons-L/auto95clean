import {
    Accordion,
    Col,
    Row, Table
} from "react-bootstrap";

import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

import {
    useEffect,
    useState
} from "react";

import apiHandler from "../../apiHandler";
import Loader from "../Loader";

const CUSTOM_FORMULA_LABEL = "Custom"

const Reservations = props => {

    const [isLoading, setIsLoading] = useState(true)
    const [reservations, setReservations] = useState(null)
    const [error, setError] = useState(null)

    useEffect( () => {
        apiHandler
            .fetchUserReservationsFullInformations()
            .then(response => {
                setReservations(response.data.reservations)
                setIsLoading(false)
            })
            .catch(response => setIsLoading(false))
    }, [])

    return(
        <Row>
            <h3 className={"mb-4"}>Mes Réservations</h3>
            <Row className={"justify-content-center"}>
                {
                    isLoading ?
                        <Loader />
                    :
                        <Accordion className={"mb-4"}>
                            {
                                reservations ?
                                    reservations.map(reservation => {
                                        return (
                                            <AccordionItem key={"reservation-" + reservation.id}
                                                           eventKey={"reservation-" + reservation.id}
                                                           className={"mb-4 border-top"}
                                            >
                                                <AccordionHeader>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Numéro de réservation</p>
                                                        <p className={"mb-0"}>{reservation.id}</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Date</p>
                                                        <p className={"mb-0"}>{new Date(reservation.reservationDate).toLocaleDateString()}</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Prix</p>
                                                        <p className={"mb-0"}>{reservation.formulaPrice} €</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Status</p>
                                                        <p className={"mb-0"}>{reservation.state}</p>
                                                    </Col>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    <Row className={"align-items-center"}>
                                                        <Col className={"me-5"}>
                                                            <p className={"font-size-14 fw-semibold mb-0"}>Type de
                                                                véhicule</p>
                                                            <p className={"font-size-14"}>{reservation.vehicleTypeLabel}</p>
                                                        </Col>
                                                        <Col className={"font-size-14"}>
                                                            <p className={"fw-semibold mb-0"}>Immatriculation</p>
                                                            <p>{reservation.immatriculation}</p>
                                                        </Col>
                                                        <Col className={"font-size-14"}>
                                                            <p className={"fw-semibold mb-0"}>Mode de paiement</p>
                                                            <p>{reservation.paymentMode}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"align-items-center"}>
                                                        <Col md={1}>
                                                            <p className={"font-size-14 fw-semibold mb-0"}>Formule</p>
                                                            <p className={"font-size-14"}>{reservation.formulaLabel} </p>
                                                        </Col>
                                                        <Col md={11}>
                                                            <Table className={"font-size-14 m-3"}>
                                                                <thead>
                                                                <tr>
                                                                    <th>Nom</th>
                                                                    <th>Type</th>
                                                                    {
                                                                        reservation.formulaLabel === CUSTOM_FORMULA_LABEL &&
                                                                        <th>Prix</th>
                                                                    }
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    reservation.tasks.map(task => {
                                                                        return (

                                                                            <tr key={"reservation-" + reservation.id + "task-" + task.id}
                                                                                className={"font-size-14"}>
                                                                                <td>{task.label}</td>
                                                                                <td>{task.type}</td>
                                                                                {reservation.formulaLabel === CUSTOM_FORMULA_LABEL &&
                                                                                <td>{task.price}</td>}
                                                                            </tr>


                                                                        )
                                                                    })
                                                                }
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                    </Row>
                                                </AccordionBody>
                                            </AccordionItem>
                                        )
                                    })
                                    :
                                    <div>Erreur : {error}</div>
                            }
                        </Accordion>
                }
            </Row>
        </Row>
    )
}

export default Reservations