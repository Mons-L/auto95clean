import {Button, Card, Col, Row} from "react-bootstrap";
import Link from "next/link";
import BagVplus from "../resources/icons/BagVplus";
import global from '../pagesPath'

const ProductItem = ({product}) => {
    return(
        <Col xs={12} md={6} lg={4} className={"mb-4 p-4"}>
                <Card className={"border-0 text-center align-content-between"}>
                    <Link href={global.PRODUCTS_PAGE_PATH + product.id} className={"text-decoration-none text-black"}>
                        <Card.Img className={"rounded shadow-sm"} variant="top" src={product.imagePath} />
                    </Link>
                    <Card.Body>
                        <Link className={"text-decoration-none text-black text-start"} href={global.PRODUCTS_PAGE_PATH + product.id}>
                            <Card.Text className={'m-0'}>{product.label}</Card.Text>
                        </Link>
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