import {
    Accordion,
    Col,
    Row
} from "react-bootstrap";

import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

import Image from "next/image";

import {
    useEffect,
    useState
} from "react";

import apiHandler from "../../apiHandler";

const DELIVERY_ADDRESS_TYPE = "LIVRAISON"
const BILLING_ADDRESS_TYPE = "FACTURATION"
const MIXTE_ADDRESS_TYPE = "MIXTE"

const MyInformations = props => {

    const [orders, setOrders] = useState(null)
    const [error, setError] = useState(null)


    useEffect( () => {
        apiHandler
            .fetchOrdersFullInformations()
            .then(response => setOrders(response.data.orders))
            .catch(response => setError(response.error))
    }, [])

    return(
        <Row>
            <h3 className={"mb-4"}>Mes commandes</h3>
            <Row className={"justify-content-center"}>
                <Accordion className={"mb-4"}>
                {
                    orders ?
                        orders.map(order => {
                            const billingAddress = order.addresses.find(address => address.type === BILLING_ADDRESS_TYPE || address.type === MIXTE_ADDRESS_TYPE)
                            const deliveryAddress = order.addresses.find(address => address.type === DELIVERY_ADDRESS_TYPE || address.type === MIXTE_ADDRESS_TYPE)

                            return (
                                <AccordionItem key={"order-" + order.id} eventKey={"order-" + order.id}>
                                    <AccordionHeader>
                                        <Col className={"font-size-14"}>
                                            <Row className={"fw-semibold"}>
                                                Numéro de commande
                                            </Row>
                                            <Row>
                                                { order.id }
                                            </Row>
                                        </Col>
                                        <Col className={"font-size-14"}>
                                            <Row className={"fw-semibold"}>
                                                Date de commande
                                            </Row>
                                            <Row>
                                                { new Date(order.date).toLocaleDateString() }
                                            </Row>
                                        </Col>
                                        <Col className={"font-size-14"}>
                                            <Row className={"fw-semibold"}>
                                                Total
                                            </Row>
                                            <Row>
                                                { order.products.reduce((previous, current) => previous + current.price, 0).toLocaleString() } €
                                            </Row>
                                        </Col>
                                        <Col className={"font-size-14"}>
                                            <Row className={"fw-semibold"}>
                                                Status de la commande
                                            </Row>
                                            <Row>
                                                { order.status }
                                            </Row>
                                        </Col>
                                    </AccordionHeader>
                                    <AccordionBody>
                                        {
                                            order.products.map(product => {
                                                return (
                                                    <Row key={"order-" + order.id + "product-" + product.id} className={"align-items-center border-bottom"}>
                                                        <Col md={1} className={"m-2"}>
                                                            <Image
                                                                src={product.imagePath}
                                                                width={60}
                                                                height={70}
                                                                alt={"product-image-" + product.id}
                                                            />
                                                        </Col>
                                                        <Col md={8}>
                                                            <Row className={"font-size-14"}>
                                                                {product.label}
                                                            </Row>
                                                            <Row className={"fst-italic font-size-14"}>
                                                                Référence : {product.id}
                                                            </Row>
                                                            <Row className={"fst-italic font-size-14"}>
                                                                Quantité : {product.quantity}
                                                            </Row>
                                                        </Col>
                                                        <Col md={2}>
                                                            <Row className={"fw-semibold justify-content-end"}>
                                                                Prix
                                                            </Row>
                                                            <Row className={"justify-content-end"}>
                                                                {product.price}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        }
                                        <Row>
                                            <Col className={"ms-3 mt-3"}>
                                                <Row className={"fw-semibold"}>
                                                    Mode de paiement
                                                </Row>
                                                <Row>
                                                    {order.paymentMode}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className={"mt-4 ms-1"}>
                                            <Col md={6}>
                                                <Row className={"fw-semibold"}>
                                                    Type de livraison
                                                </Row>
                                                <Row>
                                                    {order.deliveryType}
                                                </Row>
                                            </Col>
                                            <Col md={5}>
                                                <Row className={"fw-semibold"}>
                                                    Montant de la livraison
                                                </Row>
                                                <Row>
                                                    {order.deliveryCharges}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className={"mt-4 ms-1 mb-2"}>
                                            <Col md={6}>
                                                <Row className={"fw-semibold"}>
                                                    Adresse de livraison
                                                </Row>
                                                <Row>
                                                    {deliveryAddress && deliveryAddress.fullname}
                                                </Row>
                                                <Row>
                                                    {deliveryAddress && (deliveryAddress.number + " " + deliveryAddress.label)}
                                                </Row>
                                                <Row>
                                                    {deliveryAddress && deliveryAddress.deliveryCity}
                                                </Row>
                                            </Col>
                                            <Col md={6}>
                                                <Row className={"fw-semibold"}>
                                                    Adresse de facturation
                                                </Row>
                                                <Row>
                                                    {billingAddress && billingAddress.fullname}
                                                </Row>
                                                <Row>
                                                    {billingAddress && (billingAddress.number + " " + billingAddress.label)}
                                                </Row>
                                                <Row>
                                                    {billingAddress && billingAddress.billingCity}
                                                </Row>
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
            </Row>
        </Row>
    )
}

export default MyInformations