import Image from "next/image";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";

const ImageGallery = props => {
    const [currentImage, setCurrentImage] = useState(props.imagesPath[0])
    return(
        <Row>
            <Col>
                <Row>
                    <Image src={currentImage} alt={"product-image"} width={50} height={50}/>
                </Row>
                <Row>
                    <Image src={currentImage} alt={"product-image"} width={50} height={50}/>
                </Row>
                <Row>
                    <Image src={currentImage} alt={"product-image"} width={50} height={50}/>
                </Row>
            </Col>
            <Col>
                <Image src={currentImage} alt={"product-image"} layout={'fill'} objectFit={'cover'}/>
            </Col>
        </Row>
    );
}

export default ImageGallery;