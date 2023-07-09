import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Footer from "../../../components/footer/Footer";
import MyNavBar from "../../../components/mynavbar/MyNavBar";
import LeftArrow from "../../../resources/icons/LeftArrow";
import Link from "next/link";
import ImageGallery from "../../../components/imageGallery/ImageGallery";
import {useRouter} from "next/router";
import Image from "next/image";
import {useState} from "react";
import global from "../../../pagesPath";
import apiHandler from "../../../apiHandler";

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(context){
    const id = context.params.id
    const product = await apiHandler.fetchProduct(id).then(response => response.data.product)

    return{
        props:{
            product: product
        }
    }
}

const ProductScreen = props => {

    const product = {id: '1', title: 'titre produit', description: 'description blablablabla', price: '4.99',
        imagesPath: [
            'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp',
            'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/03/Slider-Essences-Desktop-510x273.jpg.webp',
            'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/03/Slider-Flacons-Desktop-450x540.jpg.webp'
        ]
    }


    const [selectedImage, setSelectedImage] = useState(0);

    const handleSelectedImage = (imageNumber) => {
        setSelectedImage(imageNumber);
    }

        return(
            !props.product?
                <div>Product Not Found</div>
            :
                <>
                    <MyNavBar />
                    <Container>
                        <Row className={"my-3 my-sm-4"}>
                            <Link href={global.PRODUCTS_PAGE_PATH} className={"d-flex align-items-center text-decoration-none color-black"}>
                                <LeftArrow className={"d-flex"} fill={"black"} />
                                <p className={"m-0 ms-2"}>Retour aux produits</p>
                            </Link>
                        </Row>

                        <Row>
                            <Col md={12} lg={6} className={"mb-4"}>
                                <Row>
                                    <Col sm={2} className={"d-sm-block d-none"}>
                                        {
                                            /*props.product.imagesPath.map((imagePath, index) => {
                                                return (*/
                                                    <Row key={"image-"/*+index*/} className={"mb-2"}>
                                                        <img
                                                            onClick={() => handleSelectedImage(0/*index*/)}
                                                            role={"button"}
                                                            className={"img-fluid " + (true /*selectedImage===index*/? "border border-1" : "")}
                                                            src={props.product.imagePath}
                                                            alt={"product image"}
                                                        />
                                                    </Row>
                                               /* );
                                            })*/
                                        }
                                    </Col>
                                    <Col sm={10}>
                                        <img className={"img-fluid"} src={props.product.imagePath/*[selectedImage]*/} width={500} alt={"image of product"}/>
                                    </Col>
                                </Row>

                            </Col>
                            <Col md={12} lg={6} className={"mb-4"}>
                                <Row>
                                    <Col lg={12} xl={12}>
                                        <h3>{props.product.label}</h3>
                                        <div className={"d-flex"}>
                                            <p>Catégorie</p>
                                            <p className={"ms-3"}>{props.product.categoryLabel}</p>
                                        </div>
                                        <div>
                                            <p>Description</p>
                                            <p>{props.product.description}</p>
                                        </div>
                                    </Col>

                                    <Col lg={12} xl={12}>
                                        <Card className={"p-3 shadow-sm"}>
                                            <div className={"d-flex justify-content-between"}>
                                                <p>Prix</p>
                                                <p>{props.product.price} €</p>
                                            </div>
                                            <div className={"d-flex justify-content-between"}>
                                                <p>Retrait en magasin</p>
                                                <p>Gratuit</p>
                                            </div>
                                            <div className={"d-flex justify-content-between"}>
                                                <p>Livraison</p>
                                                <p>à partir de 3,99€</p>
                                            </div>
                                            <Button>Ajouter au panier</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*
                            <Row className={"mb-4"}>
                                <Row>
                                    <h2>Nous vous recommandons</h2>
                                </Row>
                                <Row>
                                    scrollbar
                                    <Col>PRODUIT1</Col>
                                    <Col>PRODUIT1</Col>
                                </Row>
                            </Row>*/
                        }

                    </Container>
                <Footer />
            </>
    )
}
export default ProductScreen