import MyNavBar from "../../../components/mynavbar/MyNavBar";
import Footer from "../../../components/footer/Footer";
import {Button, Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import BagVplus from "../../../resources/icons/BagVplus";
import Search from "../../../resources/icons/Search";
import Link from "next/link";
import {useEffect, useState} from "react";
import ProductItem from "../../../components/ProductItem";
import apiHandler from "../../../apiHandler";
import {useRouter} from "next/navigation";
import pagesPath from "../../../pagesPath"

const INITIAL_SORT = "preferred"

const Products = props => {

    const router = useRouter()

    const [filters, setFilters] = useState({
        sort: INITIAL_SORT,
        categories: null
    })
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState(props.products)

    useEffect(() => {
        apiHandler.fetchProductsByFilters(filters)
            .then(response => setProducts(response.data.products))
    }, [filters])

    useEffect(() => {
        console.log(search)
    }, [search])

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        console.log("submit search")
        router.replace({
            pathname: pagesPath.PRODUCTS_PAGE_PATH,
            query: { q: search}
        })
        apiHandler.fetchProductsBySearch(search)
            .then(response => setProducts(response.data.products))
    }

    const handleInput = (inputValue, handler, trivialObject, inputName, stateName) => {
        if(trivialObject)
            handler(inputValue);
        else
            handler({...stateName, [inputName]: inputValue})
    }

    const handleCategoriesFilter = () => {
        if(!filters.categories)
            return setFilters({...filters, categories: []});
        return setFilters({...filters, categories: null});
    }

    const handleSelectedCategories = (value) => {
        if(filters.categories.indexOf(value) === -1)
            return setFilters({...filters, categories: [...filters.categories, value]})
        return setFilters({...filters, categories: filters.categories.filter(v => v !== value)})
    }

    const sortChoices = [
        {value: "preferred", label: "Préférés"},
        {value: "ascendingPrice", label: "Prix croissant"},
        {value: "descendingPrice", label: "Prix décroissant"},
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
                    <Col md={3}>
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
                                                checked={filters.sort === sortChoice.value}
                                                onChange={() => handleInput(sortChoice.value, setFilters, false, "sort", filters)}
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
                                <Button variant={"outline-dark"} onClick={handleCategoriesFilter}>{filters.categories? "-" : "+"}</Button>
                            </Col>
                            {
                                filters.categories &&
                                props.categories.map(category => {
                                    return(
                                        <Form.Check
                                            key={"checkbox-" + category.id}
                                            type={"checkbox"}
                                            id={category.id}
                                            name={"selectedCategory"}
                                            value={category.id}
                                            label={category.label}
                                            checked={filters.categories.indexOf(category.id) !== -1}
                                            onChange={() => handleSelectedCategories(category.id)}
                                        />
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Form onSubmit={e => handleSearchSubmit(e)}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type={'search'}
                                        placeholder="Rechercher"
                                        aria-label="Rechercher"
                                        aria-describedby="basic-addon1"
                                        value={search}
                                        onChange={(e) => handleInput(e.target.value, setSearch, true)}
                                    />
                                    <Button type={"submit"}><Search fill={'black'} /></Button>
                                </InputGroup>
                            </Form>
                        </Row>
                        <Row className={'justify-content-start'}>
                            {
                                products.map(product => <ProductItem key={"product"+product.id} product={product} />)
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

export async function getStaticProps() {
    const products = await apiHandler.fetchProducts().then(response => response.data.products).catch(err => console.log(err))
    const productCategories = await apiHandler.fetchProductCategories().then(response => response.data.productCategories).catch(err => console.log(err))

    return {
        props: {
            products: products,
            categories: productCategories
        }
    }
}