import {
    Accordion,
    Button,
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

import apiHandler from "../../../apiHandler";

import Loader from "../../Loader";
import UpdateProduct from "./modals/UpdateProduct";

const Products = props => {

    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [backdrop, setBackdrop] = useState(true);


    useEffect(() => {
        apiHandler.fetchProducts()
            .then( (response) => {
                setProducts(response.data.products)
                setIsLoading(false)
            })
    }, [])

    return(
        <Row>
            <Col>
                <h3 className={"mb-4"}>Produits</h3>
            </Col>
            <Col className={"d-flex justify-content-end fw-bold"}>
                <p className={"border p-2"}>+</p>
            </Col>
            <Row className={"justify-content-center"}>
                {
                    isLoading ?
                        <Loader/>
                        :
                        <Accordion className={"mb-4"} >
                            {
                                products ?
                                    products.map(product => {
                                        return (
                                            <AccordionItem
                                                key={"order-" + product.id}
                                                eventKey={"order-" + product.id}
                                                className={"mb-4 border-top"}
                                            >
                                                <AccordionHeader>
                                                    <Col md={1} className={"me-4"}>
                                                        <Image
                                                            src={product.imagePath}
                                                            width={80}
                                                            height={90}
                                                            alt={"product-image-" + product.id}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <p className={"fw-semibold mb-2"}>Nom</p>
                                                        <p>{product.label}</p>
                                                    </Col>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    <Row className={"align-items-center"}>
                                                        <Col md={12} className={"border-bottom pb-3"}>
                                                            <p className={"fw-semibold mb-0"}>Description</p>
                                                            <p className={"mb-0"}>{product.description}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className={"fw-semibold justify-content-end mb-0"}>Prix</p>
                                                            <p className={"mb-0"}>{product.price} €</p>
                                                        </Col>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0 mt-3"}>Quantité</p>
                                                            <p>{product.quantity}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0 mt-3"}>Référence</p>
                                                            <p>{product.id}</p>
                                                        </Col>
                                                        <Button
                                                            className={"fw-semibold"}
                                                            variant="dark"
                                                            onClick={() => {
                                                                setModalShow(true)
                                                                setSelectedProduct(product)
                                                            }}
                                                        >
                                                            Modifier
                                                        </Button>
                                                        <UpdateProduct
                                                            backdrop={backdrop ? "static" : false}
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                            product={product}
                                                        />
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

export default Products