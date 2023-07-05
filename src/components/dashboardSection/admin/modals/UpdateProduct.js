import {
    Button,
    Col,
    Modal,
    Row
} from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Image from "next/image";

import {
    useState
} from "react";

import {
    handleInput
} from "../../../../utils";

const UpdateProduct = props => {
    const [product, setProduct] = useState(props.product)
    return(
        <Modal
            size="xl"
            centered
            backdrop={true}
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Formulaire de modification</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"m-2"}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className={"fw-semibold m-1"}>Référence</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={props.product.id}
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col>
                            <Form.Group>
                                <Form.Label className={"fw-semibold m-1"}>Nom</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={product.label}
                                    onChange={(event) => handleInput(event.target.value, setProduct, false, "label", product)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className={"mt-2"}>
                                <Form.Label className={"fw-semibold m-1"}>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name={"content"}
                                    value={product.description}
                                    placeholder="Message"
                                    onChange={(event) => handleInput(event.target.value, setProduct, false, "description", product)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1} className={"m-3"}>
                            <Image
                                src={product.imagePath}
                                width={80}
                                height={90}
                                alt={"product-image-"}
                            />
                        </Col>
                        <Col>
                            <Form.Group className={"mt-2"}>
                                <Form.Label className={"fw-semibold m-1"}>Lien de l'image</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name={"content"}
                                    value={product.imagePath}
                                    placeholder="Message"
                                    onChange={(event) => handleInput(event.target.value, setProduct, false, "imagePath", product)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col>
                            <Form.Group>
                                <Form.Label className={"fw-semibold m-1"}>Prix</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={product.price}
                                    onChange={(event) => handleInput(event.target.value, setProduct, false, "price", product)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className={"fw-semibold m-1"}>Quantité</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={product.quantity}
                                    onChange={(event) => handleInput(event.target.value, setProduct, false, "quantity", product)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col>
                            <p className={"fw-semibold m-1"}>Catégorie</p>
                            <Form.Select
                                value={product.categoryId}
                                onChange={ (event) => setProduct({...product, categoryId: parseInt(event.target.value)})}
                            >
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
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onHide}
                    variant="dark"
                >
                    Annuler les modifications
                </Button>
                <Button
                    onClick={() => props.save(product)}
                    variant="dark"
                >
                    Enregistrer les modifications
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateProduct