import {Col, Container, Row} from "react-bootstrap";
import Link from "next/link";

const CONTACT_LINK_KEY = "/contact"

const Footer = props =>{
    return(
        <Row className={'footer align-items-end position-sticky mb-0'}>
            <Row>
                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Contact</p>
                        <Link href={ CONTACT_LINK_KEY }>Nous contacter </Link>
                        <p>07 65 62 16 98</p>
                    </div>
                </Col>

                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Itinéraire</p>
                        <p>88 Rue Michel Carré</p>
                        <p>95100 Argenteuil</p>
                    </div>
                </Col>

                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Réseaux sociaux</p>
                        <p>INSTA</p>
                        <p>SNAP</p>
                    </div>
                </Col>
            </Row>

            <Row className={'text-center'}>
                <Col>
                    <Container className={'footer-legal'}>
                        <p>©2023 Auto95Clean - Tous droits résérvés.</p>
                    </Container>
                </Col>

            </Row>
        </Row>
    );
}

export default Footer;