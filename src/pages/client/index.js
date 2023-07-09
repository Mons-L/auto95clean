import Head from 'next/head'
import MyNavBar from "../../components/mynavbar/MyNavBar";
import Footer from "../../components/footer/Footer";

import imageLavage1 from "../../resources/images/lavage_1.png"
import imageLavage2 from "../../resources/images/lavage_2.png"
import imageLavage3 from "../../resources/images/lavage_3.png"
import calendar from "../../resources/images/icones/calendar.png"
import location from "../../resources/images/icones/location.png"
import contact from "../../resources/images/icones/contact.png"

import global from '../../pagesPath'
import Image from 'next/image'

import {
    Button,
    Col,
    Container,
    Row
} from "react-bootstrap";

import {
    useEffect,
    useRef
} from "react";

import Link from "next/link";

export default function Home() {
    const myRef = useRef()
    useEffect(() => {
        const observer = new IntersectionObserver((entries) =>{
            const entry = entries[0];
            console.log(entry);
        })
        observer.observe(myRef.current);
    }, [])

    return (
        <>
            <Head>
                <title>Auto 95 Clean</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MyNavBar activepath={'/'} />
            <Row className={"header-background text-center align-items-center"}>
                <div className={"title-background"}>
                    <h1>Auto95Clean by ATF</h1>
                    <p>Lavage automobile à la main</p>
                </div>
            </Row>
            <Container className={"mb-5"}>
                <Row className={"mt-5 mb-5"}>
                    <Col className="col-md-4 justify-content-center">
                        <Row>
                            <Col md={3}>
                                <Image className={"me-0"} src={calendar} width={40} height={40} alt={"Lavage 1"}/>
                            </Col>
                            <Col md={9}>
                                <p className={"fw-bold"}>Prendre rendez-vous</p>
                                <p>Créneaux réservés</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={3}>
                                <Image src={location} width={30} height={40} alt={"Lavage 1"}/>
                            </Col>
                            <Col md={9} className={"col-md-9 d-inline-block"}>
                                <p className={"fw-bold"}>Venir à nous</p>
                                <p>88 Rue Michel Carré, 95100 Argenteuil</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="justify-content-center">
                        <Row>
                            <Col className={"col-md-3 d-inline-block"}>
                                <Image src={contact} width={40} height={40} alt={"Lavage 1"}/>
                            </Col>
                            <Col className={"col-md-9 d-inline-block"}>
                                <p className={"fw-bold"}>Nous contacter</p>
                                <p>07 65 62 16 98</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={"justify-content-center mt-5 mb-5"}>
                    <Col className={"col-md-11 text-center"}>
                        <h2>Lavage automobile à la main</h2>
                        <p>
                            Spécialisée dans le nettoyage et l'entretien de voitures, nous sommes là pour vous aider à garder votre véhicule dans les meilleures conditions.
                            Nous sommes fiers de proposer des services personnalisés pour répondre aux besoins spécifiques de chaque client.
                        </p>
                    </Col>
                </Row>
                <Row className={"mt-5 mb-5"}>
                    <Col className={"text-center"}>
                        <Link href={global.SERVICES_PAGE_PATH}>
                            <Button variant="dark">Choisis ta formule</Button>
                        </Link>
                    </Col>
                    <Col className={"text-center"}>
                        <Link href={global.SERVICES_PAGE_PATH}>
                            <Button variant="dark">Composes ton lavage</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className={"text-center"} ref={myRef}>
                        <Image
                            src={imageLavage1}
                            width={400}
                            height={535}
                            style={{ zIndex: "3"}}
                            alt={"Photo d'une personne nettoyant une voiture"}
                        />
                        <Image
                            src={imageLavage2}
                            width={450}
                            height={250}
                            style={{marginLeft: "-50px", marginTop:"-250px", zIndex: "2"}}
                            alt={"Photo d'une personne nettoyant une voiture"}
                        />
                        <Image
                            src={imageLavage3}
                            width={525}
                            height={250}
                            style={{marginTop: "-350px", marginLeft: "400px", zIndex: "3"}}
                            alt={"Photo d'une personne nettoyant une voiture"}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
