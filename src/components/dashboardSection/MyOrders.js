import {
    Accordion,
    AccordionCollapse,
    Col,
    Row
} from "react-bootstrap";

import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

const orders =
    [
        {
            id: 1,
            date: "08-09-2023",
            deliveryType: "Domicile",
            deliveryCharges: 2.99,
            paymentMode: "Carte",
            amount: 20.98,
            status: "Terminé",
            products: [
                {
                    name: "Parfum d'intérieur Love",
                    price: 12.99
                },
                {
                    name: "Nettoyant pour tapis Azzaro",
                    price: 7.99
                }
            ],
            addresses: [
                {
                    delivery: "1 rue de La Justice, 78200 Mantes-la-Jolie",
                    billing: "3 rue de l'Esplanade, 93300 Trappes"
                }
            ]
        },{
        id: 1,
        date: "08-09-2023",
        deliveryType: "Domicile",
        deliveryCharges: 2.99,
        paymentMode: "Carte",
        amount: 20.98,
        status: "Terminé",
        products: [
            {
                name: "Parfum d'intérieur Love",
                price: 12.99
            },
            {
                name: "Nettoyant pour tapis Azzaro",
                price: 7.99
            }
        ],
        addresses: [
            {
                delivery: "1 rue de La Justice, 78200 Mantes-la-Jolie",
                billing: "3 rue de l'Esplanade, 93300 Trappes"
            }
        ]
    }

    ]


const MyInformations = props => {
    return(
        <Row>
            <h3>Mes commandes</h3>
            <Row className={"justify-content-center"}>
                {
                    orders.map(order => {
                        return (
                            <Accordion key={"dd"}>
                                <AccordionItem eventKey={""}>
                                    <AccordionHeader>
                                        <Col>
                                            { order.id }
                                        </Col>
                                        <Col>
                                            { order.date }
                                        </Col>
                                        <Col>
                                            { order.amount }
                                        </Col>
                                    </AccordionHeader>
                                </AccordionItem>
                                <AccordionCollapse eventKey={""}>
                                    <AccordionBody>
                                        <p>gbhjnk</p>
                                    </AccordionBody>
                                </AccordionCollapse>
                            </Accordion>
                        )
                    })
                }
            </Row>
        </Row>
    )
}

export default MyInformations