import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";

import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";

import {
    handleInput
} from "../../utils";

import {
    useEffect,
    useState
} from "react";

import apiHandler from "../../apiHandler";

import Image from "next/image";
import Loader from "../../components/Loader";

const Cart = props => {

    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [couponCode, setCouponCode] = useState("")

    useEffect( () => {
        apiHandler
            .fetchUserOrdersFullInformations()
            .then(response => {
                setOrder(response.data.orders[0])
                setIsLoading(false)
            })
            .catch(response => setIsLoading(false))
    }, [])


    return(
        <>
            <MyNavBar activepath={'/index'} />
            <Container className={"mb-5"}>
                <Row className={'my-5'}>
                    <h2>Panier</h2>
                </Row>
                <Row>
                    <Col
                        md={8}
                        className={"me-2"}
                    >
                    {
                        isLoading ?
                            <Loader/>
                        :
                            order?
                                order.products.map(product => {
                                    return (
                                        <Row key={"product-" + product.id} style={{backgroundColor: "#f7f3f8"}}>
                                            <Col md={1} className={"m-2"}>
                                                <Image
                                                    src={product.imagePath}
                                                    width={80}
                                                    height={95}
                                                    alt={"product-image-" + product.id}
                                                />
                                            </Col>
                                            <Col md={6} className={"m-3 align-items-center"}>
                                                <p className={"fw-semibold mb-0"}>{product.label}</p>
                                                <p className={"fst-italic mb-1"}>Référence : {product.id}</p>
                                                <Col sm={2}>
                                                    <Form.Select>
                                                        <option>{product.quantity}</option>
                                                    </Form.Select>
                                                </Col>
                                            </Col>
                                            <Col md={2} className={"m-3 align-items-center"}>
                                                <p className={"fw-semibold justify-content-end mb-0"}>Prix</p>
                                                <p className={"justify-content-end mb-0"}>{product.price} €</p>
                                            </Col>
                                            <Col md={1}>x</Col>
                                        </Row>
                                    )
                                })
                            :
                                <p>Votre panier est vide.</p>
                    }
                    </Col>
                    <Col md={3}>
                        <Row
                            style={{backgroundColor:"#edd9f3"}}
                            className={"p-3"}
                        >
                            <Col md={8}>
                                <p>Sous-total</p>
                                <p>Frais de livraison</p>
                                <p className={"fw-semibold"}>Total (TVA incluse)</p>
                            </Col>
                            <Col md={4} className={"justify-content-end"}>
                                <p>{ order?.products.reduce((previous, current) => previous + current.price, 0).toLocaleString() || "-" } €</p>
                                <p>{ order?.deliveryCharges.toLocaleString() || "-" } €</p>
                                <p className={"fw-semibold"}>{ ((order?.products.reduce((previous, current) => previous + current.price, 0) + order?.deliveryCharges).toLocaleString()) || "-" } €</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button variant={"dark"} className={"justify-content-center"}>Commander</Button>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label className={"mt-3 m-1"}>Ajouter un code promo (facultatif)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={"couponCode"}
                                    value={couponCode}
                                    placeholder="Code promo"
                                    onChange={(e) => handleInput(
                                        e.target.value,
                                        setCouponCode,
                                        false,
                                        "couponCode",
                                        couponCode)
                                    }
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Cart