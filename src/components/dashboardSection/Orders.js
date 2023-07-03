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
import Loader from "../Loader";

const DELIVERY_ADDRESS_TYPE = "LIVRAISON"
const BILLING_ADDRESS_TYPE = "FACTURATION"
const MIXTE_ADDRESS_TYPE = "MIXTE"

const Orders = props => {

    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState(null)
    const [error, setError] = useState(null)


    useEffect( () => {
        apiHandler
            .fetchUserOrdersFullInformations()
            .then(response => {
                setOrders(response.data.orders)
                setIsLoading(false)
            })
            .catch(response => setIsLoading(false))
    }, [])

    return(
        <Row>
            <h3 className={"mb-4"}>Mes commandes</h3>
            <Row className={"justify-content-center"}>
                {
                    isLoading ?
                        <Loader/>
                        :
                        <Accordion className={"mb-4"} >
                            {
                                orders ?
                                    orders.map(order => {
                                        const billingAddress = order.addresses.find(address => address.type === BILLING_ADDRESS_TYPE || address.type === MIXTE_ADDRESS_TYPE)
                                        const deliveryAddress = order.addresses.find(address => address.type === DELIVERY_ADDRESS_TYPE || address.type === MIXTE_ADDRESS_TYPE)

                                        return (
                                            <AccordionItem
                                                key={"order-" + order.id}
                                                eventKey={"order-" + order.id}
                                                className={"mb-4 border-top"}
                                            >
                                                <AccordionHeader>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Numéro de commande</p>
                                                        <p className={"mb-0"}>{order.id}</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Date de commande</p>
                                                        <p className={"mb-0"}>{new Date(order.date).toLocaleDateString()}</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Total</p>
                                                        <p className={"mb-0"}>{order.products.reduce((previous, current) => previous + current.price, 0).toLocaleString()} €</p>
                                                    </Col>
                                                    <Col className={"font-size-14"}>
                                                        <p className={"fw-semibold mb-0"}>Status</p>
                                                        <p className={"mb-0"}>{order.status}</p>
                                                    </Col>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    {
                                                        order.products.map(product => {
                                                            return (
                                                                <Row key={"order-" + order.id + "product-" + product.id}
                                                                     className={"align-items-center border-bottom font-size-14"}>
                                                                    <Col md={1} className={"m-2"}>
                                                                        <Image
                                                                            src={product.imagePath}
                                                                            width={60}
                                                                            height={70}
                                                                            alt={"product-image-" + product.id}
                                                                        />
                                                                    </Col>
                                                                    <Col md={8} className={""}>
                                                                        <p className={"mb-0"}>{product.label}</p>
                                                                        <p className={"fst-italic mb-0"}>Référence
                                                                            : {product.id}</p>
                                                                        <p className={"fst-italic mb-0"}>Quantité
                                                                            : {product.quantity}</p>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <p className={"fw-semibold justify-content-end mb-0"}>Prix</p>
                                                                        <p className={"justify-content-end mb-0"}>{product.price}</p>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })
                                                    }
                                                    <Row className={"font-size-14"}>
                                                        <Col className={"ms-3 mt-3"}>
                                                            <p className={"fw-semibold mb-0"}>Mode de paiement</p>
                                                            <p className={"mb-0"}>{order.paymentMode}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-4 ms-1 font-size-14"}>
                                                        <Col md={6}>
                                                            <p className={"fw-semibold mb-0"}>Type de livraison</p>
                                                            <p className={"mb-0"}>{order.deliveryType}</p>
                                                        </Col>
                                                        <Col md={5}>
                                                            <p className={"fw-semibold mb-0"}>Montant de la livraison</p>
                                                            <p className={"mb-0"}>{order.deliveryCharges}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-4 ms-1 mb-2 font-size-14"}>
                                                        <Col md={6}>
                                                            <p className={"fw-semibold mb-0"}>Adresse de livraison</p>
                                                            <p className={"mb-0"}>{deliveryAddress && deliveryAddress.fullname}</p>
                                                            <p className={"mb-0"}>{deliveryAddress && (deliveryAddress.number + " " + deliveryAddress.label)}</p>
                                                            <p className={"mb-0"}>{deliveryAddress && deliveryAddress.deliveryCity}</p>
                                                        </Col>
                                                        <Col md={6}>
                                                            <p className={"fw-semibold mb-0"}>Adresse de facturation</p>
                                                            <p className={"mb-0"}>{billingAddress && billingAddress.fullname}</p>
                                                            <p className={"mb-0"}>{billingAddress && (billingAddress.number + " " + billingAddress.label)}</p>
                                                            <p className={"mb-0"}>{billingAddress && billingAddress.billingCity}</p>
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

export default Orders