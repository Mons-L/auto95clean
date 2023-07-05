import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";

import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";

import {
    handleInput
} from "../../utils";

import {
    useEffect,
    useState
} from "react";

import apiHandler from "../../apiHandler";
import Image from "next/image";

const products = [
    {
        id: 1,
        imagePath: "https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/500ml-Coco-Crush-.jpg.webp",
        label: "AromaZone",
        quantity: 2,
        price: 12.99
    },
    {
        id: 2,
        imagePath: "https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/150ml-Mon-Premier-Doudou.jpg.webp",
        label: "Little Mermaid",
        quantity: 1,
        price: 8.99
    }
]

const cart = props => {

    const [isLoading, setIsLoading] = useState(true)
    const [couponCode, setCouponCode] = useState("")
    const [cart, setCart] = useState("")

    useEffect( () => {
        apiHandler
            .fetchCart()
            .then(response => {
                setCart(response.data.cart)
            })
            .catch(response => setIsLoading(false))
    }, [])

    return(
        <>
            <MyNavBar activepath={'/index'} />
            <Container>
                <Row className={'my-5'}>
                    <Col>
                        <h2>Panier</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} className={"bg-primary me-2"}>
                        {
                            products ?
                                products.map(product => {
                                    return (
                                        <Row
                                            key={"product-" + product.id}
                                            className={"pt-2 pb-2"}
                                        >
                                            <Col md={1} className={"m-2"}>
                                                <Image
                                                    src={product.imagePath}
                                                    width={60}
                                                    height={70}
                                                    alt={"product-image-" + product.id}
                                                />
                                            </Col>
                                            <Col md={8} className={""}>
                                                <p className={"mb-0"}>{product.label}</p>
                                                <p className={"fst-italic mb-0"}>Référence
                                                    : {product.id}</p>
                                                <p className={"fst-italic mb-0"}>Quantité
                                                    : {product.quantity}</p>
                                            </Col>
                                            <Col md={2}>
                                                <p className={"fw-semibold justify-content-end mb-0"}>Prix</p>
                                                <p className={"justify-content-end mb-0"}>{product.price}</p>
                                            </Col>
                                        </Row>
                                    )
                                })
                                :
                                <Row className={"mb-3"}>
                                    <p>Votre panier est vide.</p>
                                </Row>
                        }
                    </Col>
                    <Col md={3}>
                        <p>Sous-total</p>
                        <p>Sous-total</p>
                        <p>Sous-total</p>
                        <Button>Commander</Button>
                        <Form.Group className="mb-3">
                            <Form.Label>Ajouter un code promo (facultatif)</Form.Label>
                            <Form.Control
                                type="text"
                                name={"couponCode"}
                                value={couponCode}
                                placeholder="nom@example.com"
                                onChange={(e) => handleInput(
                                    e.target.value,
                                    setCouponCode,
                                    false,
                                    "couponCode",
                                    couponCode)
                                }
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default cart;