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

const Products = (props) => {

    const [products, setProducts] = useState(null)
    const [productCategories, setProductCategories] = useState(null)
    const [selectedIndexProduct, setSelectedIndexProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const fetchRequiredDatas = async() => {
        const fetchedProducts = await apiHandler.fetchProducts()
        const fetchedProductCategories = await apiHandler.fetchProductCategories()

        setProducts(fetchedProducts.data.products)
        setProductCategories(fetchedProductCategories.data.productCategories)
    }

    useEffect( () => {
        fetchRequiredDatas().then(() => setIsLoading(false))
    }, [])

    const updateProduct = (product) => {
        apiHandler.updateProduct(product)
            .then( () => {
                let productsUpdated = products
                productsUpdated[selectedIndexProduct] = product
                setProducts(productsUpdated)
                setSelectedIndexProduct(null)
            })
            .catch(err => console.log(err))
    }

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
                                    products.map((product, index) => {
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
                                                        <p className={"fw-semibold"}>{product.label}</p>
                                                    </Col>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    <Row className={"mt-2"}>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0"}>Description</p>
                                                            <p>{product.description}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-1"}>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0"}>Référence</p>
                                                            <p>{product.id}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0"}>Prix</p>
                                                            <p>{product.price} €</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-1"}>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0"}>Quantité</p>
                                                            <p>{product.quantity}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className={"fw-semibold mb-0"}>Catégorie</p>
                                                            <p>{productCategories.find(pc => pc.id === product.categoryId).label}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-1"}>
                                                        <p className={"fw-semibold mb-0"}>Lien de l'image</p>
                                                        <p className={"fst-italic"}>{product.imagePath}</p>
                                                    </Row>
                                                    <Row className={"mt-1"}>
                                                        <Button
                                                            className={"fw-semibold"}
                                                            variant="dark"
                                                            onClick={() => setSelectedIndexProduct(index)}
                                                        >
                                                            Modifier
                                                        </Button>
                                                    </Row>
                                                </AccordionBody>
                                            </AccordionItem>
                                        )
                                    })
                                    :
                                    <div>Erreur : une erreur</div>
                            }
                        </Accordion>
                }
            </Row>
            {
                (!isLoading && selectedIndexProduct !== null) &&
                <UpdateProduct
                    save={updateProduct}
                    show={selectedIndexProduct !== null}
                    product={products[selectedIndexProduct]}
                    productCategories={productCategories}
                    onHide={() => setSelectedIndexProduct(null)}
                />
            }
        </Row>
    )
}

export default Products