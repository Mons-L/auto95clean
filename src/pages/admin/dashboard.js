import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";

import PersonalInformations from "../../components/dashboardSection/PersonalInformations";
import Orders from "../../components/dashboardSection/Orders";
import Preferences from "../../components/dashboardSection/Preferences";
import Reservations from "../../components/dashboardSection/Reservations";

import Products from "../../components/dashboardSection/admin/Products";
import Services from "../../components/dashboardSection/admin/Services";

import {
    Col,
    Container,
    Row
} from "react-bootstrap";

import {
    useState
} from "react";
import AdminProtectedRoute from "../../components/protectedRoutes/AdminProtectedRoute";

const PERSONAL_INFORMATIONS_TAB_KEY = "PersonalInformations"
const SERVICE_TAB_KEY = "Services"
const RESERVATIONS_TAB_KEY = "Reservations"
const PRODUCTS_TAB_KEY = "Products"
const ORDERS_TAB_KEY = "Orders"
const PREFERENCES_TAB_KEY = "Preferences"

const Dashboard = props => {

    const [user, setUser] = useState(null)
    const [selectedTab, setSelectedTab] = useState(PERSONAL_INFORMATIONS_TAB_KEY)

    const renderSections = () => {
        return (
            <>
                { selectedTab === PERSONAL_INFORMATIONS_TAB_KEY && <PersonalInformations /> }
                { selectedTab === SERVICE_TAB_KEY && <Services /> }
                { selectedTab === RESERVATIONS_TAB_KEY && <Reservations /> }
                { selectedTab === PRODUCTS_TAB_KEY && <Products /> }
                { selectedTab === ORDERS_TAB_KEY && <Orders /> }
                { selectedTab === PREFERENCES_TAB_KEY && <Preferences /> }
            </>
        )
    }

    return(
        <AdminProtectedRoute user={user} setUser={setUser}>
            <MyNavBar activepath={'/dashboard'} />
            <Container>
                <Row className={'my-5'}>
                    <Col>
                        <h2>Bienvenue sur votre espace</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(PERSONAL_INFORMATIONS_TAB_KEY)}
                        >
                            <p>Informations personnelles</p>
                        </Row>

                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(SERVICE_TAB_KEY)}
                        >
                            <p>Prestations</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(RESERVATIONS_TAB_KEY)}
                        >
                            <p>Réservations</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(PRODUCTS_TAB_KEY)}
                        >
                            <p>Produits</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(ORDERS_TAB_KEY)}
                        >
                            <p>Catégories</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(ORDERS_TAB_KEY)}
                        >
                            <p>Commandes</p>
                        </Row>

                        <Row
                            type={"button"}
                            className={"mb-3"}
                            onClick={() => setSelectedTab(PREFERENCES_TAB_KEY)}
                        >
                            <p>Préférences</p>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-3"}
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
        </AdminProtectedRoute>
    )
}

export default Dashboard;