import {Button, Card, Col, Row} from "react-bootstrap";
import Link from "next/link";
import BagVplus from "../resources/icons/BagVplus";

const ProductItem = ({product}) => {
    return(
        <Col xs={12} md={6} lg={4} className={"mb-4 p-4"}>
                <Card className={"border-0 text-center align-content-between"}>
                    <Link href={"/products/" + product.id} className={"text-decoration-none text-black"}>
                        <Card.Img className={"rounded shadow-sm"} variant="top" src={product.image_path} />
                    </Link>
                    <Card.Body>
                        <Link href={"/products/" + product.id}>
                            <Card.Text className={'m-0'}>{product.label}</Card.Text>
                        </Link>
                        <p>Marque du produit</p>
                        <Row className={'justify-content-between'}>
                            <Col className={'d-flex justify-content-start'}>
                                <Card.Text>{product.price.toLocaleString()} €</Card.Text>
                            </Col>
                            <Col className={'d-flex justify-content-end'}>
                                <BagVplus fill={'black'} width={30} role={'button'} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
        </Col>
    )
}

export default ProductItem