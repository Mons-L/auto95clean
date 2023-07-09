import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";

import PersonalInformations from "../../components/dashboardSection/PersonalInformations";
import Orders from "../../components/dashboardSection/Orders";
import Preferences from "../../components/dashboardSection/Preferences";
import Reservations from "../../components/dashboardSection/Reservations";

import {
    Col,
    Container,
    Row
} from "react-bootstrap";

import {
    useState
} from "react";
import protectedPage from "../../lib/protectedPageRoute";
import UserProtectedRoute from "../../components/protectedRoutes/UserProtectedRoute";
import apiHandler from "../../apiHandler";
import pagesPath from "../../../src/pagesPath"

import {useRouter} from "next/router";
import PersonCard from "../../resources/icons/PersonCard";
import CalendarCheck from "../../resources/icons/CalendarCheck";
import CardCheckList from "../../resources/icons/CardCheckList";
import Sliders from "../../resources/icons/Sliders";
import Logout from "../../resources/icons/Logout";

const PERSONAL_INFORMATIONS_TAB_KEY = "PersonalInformations"
const RESERVATIONS_TAB_KEY = "Reservations"
const ORDERS_TAB_KEY = "Orders"
const PREFERENCES_TAB_KEY = "Preferences"
/*
export async function getServerSideProps(context) {
    return await protectedPage.protectUserRoute(context)
}*/

const Dashboard = props => {

    const router = useRouter()
    const [user, setUser] = useState(null)
    const [selectedTab, setSelectedTab] = useState(PERSONAL_INFORMATIONS_TAB_KEY)

    const handleLogout = () => {
        apiHandler.logout()
            .then(() => router.push(pagesPath.HOME_PAGE_PATH))
    }

    const renderSections = () => {
        return (
            <>
                { selectedTab === PERSONAL_INFORMATIONS_TAB_KEY && <PersonalInformations user={user} /> }
                { selectedTab === RESERVATIONS_TAB_KEY && <Reservations /> }
                { selectedTab === ORDERS_TAB_KEY && <Orders /> }
                { selectedTab === PREFERENCES_TAB_KEY && <Preferences /> }
            </>
        )
    }

    return(
        <UserProtectedRoute user={user} setUser={setUser}>
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
                            className={"mb-4"}
                            onClick={() => setSelectedTab(PERSONAL_INFORMATIONS_TAB_KEY)}
                        >
                            <Col className={"d-flex align-items-center" + (selectedTab===PERSONAL_INFORMATIONS_TAB_KEY ? " color-black" : "")}>
                                <PersonCard height={"25"} width={"25"}/>
                                <p className={"ms-3 my-0"}>Informations personnelles</p>
                            </Col>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-4"}
                            onClick={() => setSelectedTab(RESERVATIONS_TAB_KEY)}
                        >
                            <Col className={"d-flex align-items-center" + (selectedTab===RESERVATIONS_TAB_KEY ? " color-black" : "")}>
                                <CalendarCheck height={"25"} width={"25"}/>
                                <p className={"ms-3 my-0"}>Réservations</p>
                            </Col>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-4"}
                            onClick={() => setSelectedTab(ORDERS_TAB_KEY)}
                        >
                            <Col className={"d-flex align-items-center" + (selectedTab===ORDERS_TAB_KEY ? " color-black" : "")}>
                                <CardCheckList height={"25"} width={"25"}/>
                                <p className={"ms-3 my-0"}>Commandes</p>
                            </Col>
                        </Row>
                        <Row
                            type={"button"}
                            className={"mb-4"}
                            onClick={() => setSelectedTab(PREFERENCES_TAB_KEY)}
                        >
                            <Col className={"d-flex align-items-center" + (selectedTab===PREFERENCES_TAB_KEY ? " color-black" : "")}>
                                <Sliders height={"25"} width={"25"}/>
                                <p className={"ms-3 my-0"}>Préférences</p>
                            </Col>
                        </Row>
                        <Row
                            type={"button"}
                            onClick={handleLogout}
                        >
                            <Col className={"d-flex align-items-center" + (selectedTab===RESERVATIONS_TAB_KEY ? " color-black" : "")}>
                                <Logout height={"25"} width={"25"}/>
                                <p className={"ms-3 my-0"}>Déconnexion</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        { renderSections() }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </UserProtectedRoute>
    )
}

export default Dashboard;