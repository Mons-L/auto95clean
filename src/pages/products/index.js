import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";
import {Button, Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import BagVplus from "../../resources/icons/BagVplus";
import Search from "../../resources/icons/Search";
import Link from "next/link";
import {useState} from "react";

const Products = props => {

    const [sortParam, setSortParam] = useState("preferred");
    const [selectedCategories, setSelectedCategories] = useState(null);

    const handleInput = (inputValue, handler, trivialObject, inputName, stateName) => {
        if(trivialObject)
            handler(inputValue);
        else
            handler({...stateName, [inputName]: inputValue})
    }

    const handleCategoriesFilter = () => {
        if(!selectedCategories)
            return setSelectedCategories([]);
        return setSelectedCategories(null);
    }

    const handleSelectedCategories = (value) => {
        if(selectedCategories.indexOf(value) === -1)
            return setSelectedCategories([...selectedCategories, value]);
        return setSelectedCategories(selectedCategories.filter(v => v !== value));
    }

    const categories = ["categorie1", "categorie2", "categorie3"];

    const sortChoices = [
        {value: "preferred", label: "Préférés"},
        {value: "ascendingPrice", label: "Prix croissant"},
        {value: "descendingPrice", label: "Prix décroissant"},
    ]
    const products = [
        {id: '1', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '2', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '7', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '3', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '4', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '5', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'},
        {id: '6', title: 'titre produit', description: 'description blablablabla', price: '4.99', imagePath: 'https://www.sourcedessens.fr/wp-content/webp-express/webp-images/uploads/2021/05/250ml-Linge-Propre-247x296.jpg.webp'}
    ]
    return(
        <>
            <MyNavBar activepath={'/index'} />
            <Container>
                <Row className={'my-5'}>
                    <Col>
                        <h1 className={'text-center'}>Nos produits</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <h2>Filtres</h2>
                        <Row className={"mb-3"}>
                            <p>Trier par</p>
                            <FormGroup>
                                {
                                    sortChoices.map(sortChoice => {
                                        return(
                                            <Form.Check
                                                key={"radio-" + sortChoice.value}
                                                type={"radio"}
                                                id={sortChoice.value}
                                                name={"sortParam"}
                                                value={sortChoice.value}
                                                label={sortChoice.label}
                                                checked={sortParam === sortChoice.value}
                                                onChange={() => handleInput(sortChoice.value, setSortParam, true)}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Row>
                        <Row className={"mb-3"}>
                            <Col>
                                <p>Catégorie</p>
                            </Col>
                            <Col>
                                <Button variant={"outline-dark"} onClick={handleCategoriesFilter}>{selectedCategories? "-" : "+"}</Button>
                            </Col>
                            {
                                selectedCategories &&
                                categories.map(category => {
                                    return(
                                        <Form.Check
                                            key={"checkbox-" + category}
                                            type={"checkbox"}
                                            id={category}
                                            name={"selectedCategorie"}
                                            value={category}
                                            label={category}
                                            checked={selectedCategories.indexOf(category) !== -1}
                                            onChange={() => handleSelectedCategories(category)}
                                        />
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Form>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type={'search'}
                                        placeholder="Rechercher"
                                        aria-label="Rechercher"
                                        aria-describedby="basic-addon1"
                                    />
                                    <Button><Search fill={'black'} /></Button>
                                </InputGroup>
                            </Form>
                        </Row>
                        <Row className={'justify-content-start'}>
                            {
                                products.map(product => {
                                    return(
                                        <Col xs={6} md={6} lg={4}  key={'product-' + product.id} className={'mb-4'}>
                                            <Link href={"/products/" + product.id} className={"text-decoration-none text-black"}>
                                                <Card>
                                                    <Card.Img variant="top" src={product.imagePath} />
                                                    <Card.Body>
                                                        <Card.Text className={'m-0'}>{product.title}</Card.Text>
                                                        <Card.Text>{product.description}</Card.Text>
                                                        <Row className={'justify-content-between'}>
                                                            <Col className={'d-flex justify-content-start'}>
                                                                <Card.Text>{product.price.replace('.',',')} €</Card.Text>
                                                            </Col>
                                                            <Col className={'d-flex justify-content-end'}>
                                                                <BagVplus fill={'black'} width={30} role={'button'} />
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Products;