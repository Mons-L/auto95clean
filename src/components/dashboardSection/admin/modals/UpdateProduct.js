import {
    Button,
    Col,
    Modal,
    Row
} from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Image from "next/image";

const UpdateProduct = props => {
    return(
        <Modal
            {...props}
            size="xl"
            centered
            backdropClassName={"b"}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.product.label}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className={"d-flex m-1 fw-semibold"}>Nom</Form.Label>
                        <Form.Control
                            type={"text"}
                            value={props.product.label}
                            onChange={() => console.log("Firstname")}
                        />
                    </Form.Group>
                    <Form.Group className={"mt-4"}>
                        <Form.Label className={"d-flex m-1 fw-semibold"}>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name={"content"}
                            value={props.product.description}
                            placeholder="Message"
                            onChange={() => console.log("Description")}
                        />
                    </Form.Group>
                    <Row>
                    <Col md={1} className={"m-4"}>
                        <Image
                            src={props.product.imagePath}
                            width={80}
                            height={90}
                            alt={"product-image-"}
                        />
                    </Col>
                        <Col>

                    <Form.Group className={"mt-4"}>
                        <Form.Label className={"d-flex m-1 fw-semibold"}>Lien de l'image</Form.Label>
                        <Form.Control
                            type={"text"}
                            value={props.product.imagePath}
                            onChange={() => console.log("Lien de l'image")}
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className={"mt-2"}>
                                <Form.Label className={"d-flex m-1 fw-semibold"}>Prix</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={props.product.price}
                                    onChange={() => console.log("Prix")}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className={"mt-2"}>
                                <Form.Label className={"d-flex m-1 fw-semibold"}>Quantité</Form.Label>
                                <Form.Control
                                    type={"lastname"}
                                    value={props.product.quantity}
                                    onChange={() => console.log("Quantité")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Select className={"mt-4 mb-4"}>
                        <Form.Label className={"d-flex m-1 fw-semibold"}>Catégorie</Form.Label>
                        <option>{ props.product.category }</option>
                        <option>Catégorie 2</option>
                        <option>Catégorie 3</option>
                        <option>Catégorie 4</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Enregistrer les modifications</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateProduct