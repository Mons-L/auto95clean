import {Button, Col, FloatingLabel, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import {useEffect, useState} from "react";
import { handleInput } from "../../../../utils";
import apiHandler from "../../../../apiHandler";
import uploadImage from "../../../../resources/images/upload.png"

const ADD_ACTION = "add"
const UPDATE_ACTION = "update"

const ProductModal = props => {
    const [product, setProduct] = useState({
        id: "",
        label: "",
        description: "",
        imagePath: "",
        price: "",
        quantity: "",
        categoryId: ""
    })

    useEffect(() => {
        if(props.product)
            setProduct(props.product)
        else
            setProduct({
                id: "",
                label: "",
                description: "",
                imagePath: "",
                price: "",
                quantity: "",
                categoryId: ""
            })
    }, [props.product])

    const handleUpdate = () => {
        apiHandler.updateProduct(product)
            .then( () => {
                let productsUpdated = props.products
                productsUpdated[props.selectedIndexProduct] = product
                props.setProducts(productsUpdated)
                props.setSelectedIndexProduct(null)
                props.setAction(null)
            })
            .catch(err => console.log(err))
    }

    const handleAdd = () => {
        apiHandler.addProduct(product)
            .then( () => {
                props.setProducts([...props.products, product])
            })
            .catch(err => console.log(err))
    }

    return(
        <Modal
            size="xl"
            centered
            backdrop={true}
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.action===ADD_ACTION? "Ajouter" : "Modifier"} un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"m-2"}>
                {
                    props.action=== UPDATE_ACTION &&
                    <FloatingLabel label={"Référence"}>
                    <Form.Control
                    type={"text"}
                    placeholder={"Référence"}
                    value={product.id}
                    disabled={true}
                    />
                    </FloatingLabel>
                }
                <FloatingLabel label={"Nom"} className={"mt-3"}>
                    <Form.Control
                        type={"text"}
                        placeholder={"Nom"}
                        value={product.label}
                        onChange={(event) => handleInput(event.target.value, setProduct, false, "label", product)}
                    />
                </FloatingLabel>
                <FloatingLabel label={"Description"} className={"mt-3"}>
                    <Form.Control
                        as="textarea"
                        value={product.description}
                        placeholder="Description"
                        style={{ height: '100px' }}
                        onChange={(event) =>
                            handleInput(event.target.value, setProduct, false, "description", product)}
                    />
                </FloatingLabel>
                <Row>
                    <Col md={1} className={"m-3"}>
                        <Image
                            src={product.imagePath ? product.imagePath : uploadImage.src}
                            width={80}
                            height={90}
                            alt={"product-image-"}
                        />
                    </Col>
                    <Col>
                        <FloatingLabel label={"Lien de l'image"} className={"mt-3"}>
                            <Form.Control
                                as="textarea"
                                style={{ height: '90px' }}
                                value={product.imagePath}
                                placeholder="Lien de l'image"
                                onChange={(event) =>
                                    handleInput(event.target.value, setProduct, false, "imagePath", product)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <FloatingLabel label={"Prix"}>
                            <Form.Control
                                type={"text"}
                                placeholder={"Prix"}
                                value={product.price}
                                onChange={(event) =>
                                    handleInput(event.target.value, setProduct, false, "price", product)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label={"Quantité"} >
                            <Form.Control
                                type={"text"}
                                placeholder={"Quantité"}
                                value={product.quantity}
                                onChange={(event) =>
                                    handleInput(event.target.value, setProduct, false, "quantity", product)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel label={"Catégorie"} className={"mt-3"}>
                    <Form.Select
                        id={"form-category"}
                        placeholder={"Catégorie"}
                        value={props.action===ADD_ACTION? "" : product.categoryId}
                        onChange={ (event) => setProduct({...product, categoryId: parseInt(event.target.value)})}
                    >
                        <option selected={true} disabled={true}>Sélectionner une catégorie</option>
                        {
                            props.productCategories.map(productCategory => {
                                return (
                                    <option
                                        key={"product-category-" + productCategory.id}
                                        value={productCategory.id}
                                    >
                                        {productCategory.label}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onHide}
                    variant="dark"
                >
                    Annuler les modifications
                </Button>
                <Button
                    onClick={handleUpdate}
                    variant="dark"
                >
                    Enregistrer les modifications
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductModal