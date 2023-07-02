import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";
import MyInformations from "../components/dashboardSection/MyInformations";
import MyWashes from "../components/dashboardSection/MyWashes";
import MyOrders from "../components/dashboardSection/MyOrders";
import MyPreferences from "../components/dashboardSection/MyPreferences";

import {
    Col,
    Container,
    Row
} from "react-bootstrap";

import {
    useState
} from "react";

const MY_INFORMATIONS_TAB_KEY = "MyInformations"
const MY_WASHES_TAB_KEY = "MyWahes"
const MY_ORDERS_TAB_KEY = "MyOrders"
const MY_PREFERENCES_TAB_KEY = "MyPreferences"

const dashboard = props => {

    const [selectedTab, setSelectedTab] = useState("MyInformations")

    const renderSections = () => {
        return (
            <>
                {
                    selectedTab === MY_INFORMATIONS_TAB_KEY && <MyInformations />
                }
                {
                    selectedTab === MY_WASHES_TAB_KEY && <MyWashes />
                }
                {
                    selectedTab === MY_ORDERS_TAB_KEY && <MyOrders />
                }
                {
                    selectedTab === MY_PREFERENCES_TAB_KEY && <MyPreferences />
                }
            </>
        )
    }

    return(
        <>
            <MyNavBar activepath={'/dashboard'} />
            <Container>
                <Row className={'my-5'}>
                    <Col>
                        <h2>Bienvenue sur votre espace Salma BENCHELKHA</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(MY_INFORMATIONS_TAB_KEY)}
                        >
                            <p>Mes informations</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(MY_WASHES_TAB_KEY)}
                        >
                            <p>Mes lavages</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(MY_ORDERS_TAB_KEY)}
                        >
                            <p>Mes commandes</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(MY_PREFERENCES_TAB_KEY)}
                        >
                            <p>Mes préférences</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(MY_ORDERS_TAB_KEY)}
                        >
                            <p>Déconnexion</p>
                        </Row>
                    </Col>
                    <Col md={9}>
                        { renderSections() }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default dashboard;