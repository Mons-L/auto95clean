import {Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import pagesPath from "../../pagesPath"

const Footer = props =>{
    return(
        <Row className={'footer align-items-end mt-auto'}>
            <Row>
                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Contact</p>
                        <Link className={"text-decoration-none text-white"} href={ pagesPath.CONTACT_PAGE_PATH }><p>Nous contacter</p></Link>
                        <p>07 65 62 16 98</p>
                    </div>
                </Col>

                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Adresse</p>
                        <p>88 Rue Michel Carré</p>
                        <p>95100 Argenteuil</p>
                    </div>
                </Col>

                <Col className={'d-flex justify-content-center'}>
                    <div>
                        <p>Réseaux sociaux</p>
                        <p>Instagram</p>
                        <p>Snapchat</p>
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