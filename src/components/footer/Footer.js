import {Col, Container, Row} from "react-bootstrap";

const Footer = props =>{
    return(
        <Row className={'footer align-items-end'}>
            <Row>
                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Contact</p>
                        <p>Nous contacter</p>
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