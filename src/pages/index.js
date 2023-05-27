import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyNavBar from "../components/mynavbar/MyNavBar";
import Footer from "../components/footer/Footer";
import waterDrop from '../resources/images/water_drop.png';
import {Button, Col, Container, Row} from "react-bootstrap";
import imageLavage1 from "../resources/images/lavage_1.png"
import imageLavage2 from "../resources/images/lavage_2.png"
import imageLavage3 from "../resources/images/lavage_3.png"
import calendar from "../resources/images/icones/calendar.png"
import location from "../resources/images/icones/location.png"
import contact from "../resources/images/icones/contact.png"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    return (
    <>
      <Head>
        <title>Auto 95 Clean</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <MyNavBar activepath={'/'} />
        <Row className={"abc"}>
            <h1>Auto95Clean by ATF</h1>
            <p>Lavage automobile à la main</p>
        </Row>
            <Container className="bg-light">
                <Row>
                    <Col className="col-md-4 d-flex justify-content-center border">
                        <Row className={'d-block'}>
                            <Col className={"col-md-3"}>
                                <Image src={calendar} width={50} height={50} alt={"Lavage 1"}/>
                            </Col>
                            <Col className={"col-md-9"}>
                                <p>Prendre rendez-vous</p>
                                <p>Créneaux réservés</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-md-4 d-flex justify-content-center">
                        <Row className={'d-block'}>
                            <Col className={"col-md-3"}>
                                <Image src={location} width={50} height={50} alt={"Lavage 1"}/>
                            </Col>
                            <Col className={"col-md-9"}>
                            <p>Venir à nous</p>
                            <p>88 Rue Michel Carré, 95100 Argenteuil</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-md-4 d-flex justify-content-center">
                        <Row className={'d-block'}>
                            <Col className={"col-md-3"}>
                                <Image src={contact} width={50} height={50} alt={"Lavage 1"}/>
                            </Col>
                            <Col className={"col-md-9"}>
                        <p>Nous contacter</p>
                        <p>07 65 62 16 98</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        <Container className="bg-light">
            <Row>
                <h2>Lavage automobile à la main</h2>
                <p>
                    Spécialisée dans le nettoyage et l'entretien de voitures, nous sommes là pour vous aider à garder votre véhicule dans les meilleures conditions.
                    Nous sommes fiers de proposer des services personnalisés pour répondre aux besoins spécifiques de chaque client.
                </p>
            </Row>
            <Row>
                <Button>
                    Choisis ta formule
                </Button>
                <Button className={"testButton"}>
                    Composes ton lavage
                </Button>
            </Row>
        </Container>
        <Container className="bg-light">
            <Row>
                <h2>Lavage de qualité supérieur</h2>
                <p>
                    Nos professionnels sont équipés des dernières technologies et techniques de nettoyage pour assurer la meilleure qualité de service possible.
                </p>
            </Row>
            <Image src={imageLavage1} width={300} height={400} alt={"Lavage 1"}/>
            <Image src={imageLavage2} width={300} height={400} alt={"Lavage 1"}/>
            <Image src={imageLavage3} width={600} height={200} alt={"Lavage 1"}/>
        </Container>
        <Footer />
    </>
  )
}
