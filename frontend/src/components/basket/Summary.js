import { Row, Col } from "react-bootstrap";
import React from "react";
import Card from "react-bootstrap/Card";
import Item from "../list/Item";
import Counter from "../counter/Counter";
import Accordion from "react-bootstrap/Accordion";
export const Summary = (props) => {
    const item = props.item
    return (
        <Accordion>
            <Card key={item._id}>
                <Card.Header>
                    <Row>
                        <Col xs={9}>

                            <Item
                                key={item._id}
                                name={item.name}
                                price={item.price}
                                size={item.size}
                            ></Item>

                        </Col>
                        <Col xs={3} className={"align-items-center row"}>
                            <p style={{margin:"0px"}}>{item.amount}x</p>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>
        </Accordion>
        );

}
export default Summary;
