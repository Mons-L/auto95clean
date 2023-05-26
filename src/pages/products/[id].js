import {Button, Col, Container, Row} from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import MyNavBar from "../../components/mynavbar/MyNavBar";
import LeftArrow from "../../resources/icons/LeftArrow";
import Link from "next/link";
import ImageGallery from "../../components/imageGallery/ImageGallery";

const Products = props => {
    const product = {id: '1', title: 'titre produit', description: 'description blablablabla', price: '4.99',
        imagesPath: [
            'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp',
            ]
    }

        return(
            <>
                <MyNavBar />
                <Container>
                    <Row className={"my-3"}>
                        <Col>
                            <Link href={"/products"} className={"d-flex align-items-center"}>
                                <LeftArrow className={"d-flex"} fill={"black"} />
                                <p className={"m-0 ms-2"}>Produits</p>
                            </Link>
                        </Col>
                        <Col>

                        </Col>

                    </Row>
                    <Row>
                        <p>{product.title}</p>
                    </Row>
                    <Row>
                        <Col>
                            <ImageGallery imagesPath={product.imagesPath} />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    Vendu par <strong>Auto95Clean</strong>
                                </Col>
                                <Col>
                                    <p>{product.price}</p>
                                    <p>TVA incluse</p>
                                </Col>
                            </Row>
                            <Row className={"border-bottom-1"}>
                                {product.description}
                            </Row>
                            <Row>
                                <p>Retrait en magasin <strong>gratuit</strong></p>
                                <p>Livraison à partir de 3,99€</p>
                            </Row>
                            <Row>
                                <Col>
                                    Quantité ....
                                </Col>
                                <Col>
                                    <Button>Ajouter au panier</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <h2>Nous vous recommandons</h2>
                        </Row>
                        <Row>
                            scrollbar
                            <Col>PRODUIT1</Col>
                            <Col>PRODUIT1</Col>
                        </Row>
                    </Row>
                </Container>
            <Footer />
        </>
    )
}
export default Products