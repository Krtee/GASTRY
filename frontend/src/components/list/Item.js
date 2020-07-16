import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Item = (props) => {
    const pStyle= {
        height: '100%',
        marginBottom:'0px',

    }
    return (
        <Row style={{height: '100%'}} className="align-items-center">
            <Col xs={6}>
                <p style={pStyle}>
                    {props.name}
                </p>

            </Col>
            <Col xs={3}>
                <p style={pStyle}>
                    {props.size}
                </p>
            </Col>
            <Col xs={3}>
                <p style={pStyle}>
                    {props.price}  €
                </p>
            </Col>

        </Row>
    );
};

export default Item;