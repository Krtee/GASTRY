import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./OrderListItem.scss"
import {Badge} from "@material-ui/core";

const OrderListItem = ({name, orderNr, logo, status,newMessages}) => {
    return (
        <Badge badgeContent={newMessages} color={"secondary"} style={{width: "100%",margin:"0rem -1rem"}}>
            <Card className={"supplier-card order-list " + status}>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={3}>
                            <img
                                src={logo}
                                width={50}
                                height={50}
                                alt={name + "-logo"}
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
        </Badge>
    );
};

export default OrderListItem;
