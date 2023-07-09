import {Accordion, Button, Col, FloatingLabel, Row} from "react-bootstrap";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionBody from "react-bootstrap/AccordionBody";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import {handleInput} from "../../../utils";
import Loader from "../../Loader";
import ProductModal from "./modals/ProductModal";
import apiHandler from "../../../apiHandler";
import check from "../../../resources/images/check.png";
import cross from "../../../resources/images/cross.png";

const ADD_ACTION = "add"
const UPDATE_ACTION = "update"

const Products = (props) => {

    const [newCategory, setNewCategory] = useState(null)
    const [products, setProducts] = useState(null)
    const [productCategories, setProductCategories] = useState(null)
    const [selectedIndexProduct, setSelectedIndexProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState(null)

    const fetchRequiredDatas = async() => {
        const fetchedProducts = await apiHandler.fetchProducts()
        const fetchedProductCategories = await apiHandler.fetchProductCategories()

        setProducts(fetchedProducts.data.products)
        setProductCategories(fetchedProductCategories.data.productCategories)
    }

    useEffect( () => {
        fetchRequiredDatas().then(() => setIsLoading(false))
    }, [])

    const handleOnHide = () => {
        setSelectedIndexProduct(null)
        setAction(null)
        console.log(selectedIndexProduct)
        console.log(action)
    }

    const handleAddCategory = () => {
        apiHandler.addCategory({label: newCategory})
            .then( (response) => {
                setProductCategories([...productCategories, { id: response.data.insertedId, label: newCategory }])
                setNewCategory(null)
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            {
                isLoading ?
                    <Loader/>
                :
                    <>
                        <Row className={"mb-4"}>
                            <Col>
                                <h3 className={"mb-3"}>Catégories</h3>
                            </Col>
                            <Col className={"d-flex justify-content-end fw-bold"}>
                                <Button
                                    className={"fw-semibold mb-3 me-4 pt-0 pb-0"}
                                    variant="outline-dark"
                                    onClick={() => setNewCategory("")}
                                >
                                    Ajouter une catégorie
                                </Button>
                            </Col>
                            {
                                productCategories ?
                                    productCategories.map(category => {
                                        return (
                                            <Row key={"category-" + category.id} className={"d-flex border m-2"}>
                                                <p className={"m-auto my-2"}>{category.label}</p>
                                            </Row>
                                        )
                                    })
                                    :
                                    <div>Erreur : une erreur</div>
                            }
                            {
                                (newCategory || newCategory === "") &&
                                    <Row>
                                        <Col md={11}>
                                            <FloatingLabel label={"Ajouter une catégorie"} className={"mt-2"} show>
                                                <Form.Control
                                                    type={"text"}
                                                    placeholder={"Ajouter une catégorie"}
                                                    style={{ height: '50px' }}
                                                    value={newCategory}
                                                    onChange={(event) => handleInput(event.target.value, setNewCategory, true)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <Image
                                                src={check.src}
                                                width={20}
                                                height={20}
                                                className={"m-1"}
                                                alt={"product-image-"}
                                                onClick={ handleAddCategory }
                                            />
                                            <Image
                                                src={cross.src}
                                                width={20}
                                                height={20}
                                                className={"m-1"}
                                                alt={"product-image-"}
                                                onClick={ handleAddCategory }
                                            />
                                        </Col>
                                    </Row>
                            }
                        </Row>
                        <Row>
                            <Col>
                                <h3 className={"mb-4"}>Produits</h3>
                            </Col>
                            <Col className={"d-flex justify-content-end fw-bold"}>
                                <Button
                                    className={"fw-semibold mb-3 me-4 pt-0 pb-0"}
                                    variant="outline-dark"
                                    onClick={() => setAction(ADD_ACTION)}
                                >
                                    Ajouter un produit
                                </Button>
                            </Col>
                            <Row className={"justify-content-center"}>
                                {
                                    isLoading ?
                                        <Loader/>
                                        :
                                        <Accordion className={"mb-4"}>
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
                                                                            onClick={() => {
                                                                                setSelectedIndexProduct(index)
                                                                                setAction(UPDATE_ACTION)
                                                                            }}
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
                                !isLoading && products && productCategories &&
                                <ProductModal
                                    show={action !== null}
                                    action={action}
                                    productCategories={productCategories}
                                    products={products}
                                    product={action === UPDATE_ACTION ? products[selectedIndexProduct] : null}
                                    selectedIndexProduct={action === UPDATE_ACTION ? selectedIndexProduct : null}
                                    onHide={handleOnHide}
                                    setSelectedIndexProduct={setSelectedIndexProduct}
                                    setAction={setAction}
                                    setProducts={setProducts}
                                    setCategories={setProductCategories}
                                />
                            }
                        </Row>
                    </>
            }
        </>
    )
}

export default Products