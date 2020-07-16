import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./OrderListItem.scss"

const OrderListItem = ({ name, orderNr,logo }) => {
    return (
        <Card className="supplier-card order-list">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={3}>
                        <img
                            src={logo}
                            width={50}
                            height={50}
                            alt={name+"-logo"}
                        />
                    </Col>
                    <Col xs={9}>
                        <h5 className="order-title">{name}</h5>
                        <p className="orderNr">
                            Bestellnummer: {orderNr.substr(orderNr.length - 5).toUpperCase()}
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderListItem;
