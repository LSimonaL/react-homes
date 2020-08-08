import React from 'react';
import { Col, Image } from "react-bootstrap";

export const UnsplashImage = ({ url, key }) => {


    return (
        <Col className="mb-2" md={4}>
            <Image className="images" key={key} src={url} alt="" />
        </Col>
    )
}