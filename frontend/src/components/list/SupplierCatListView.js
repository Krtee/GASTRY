import React from 'react';
import Item from "./Item";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../auth/Input";
import {Modal} from "react-bootstrap";


const SupplierCatListView = (props) => {
    const item = props.item;
    const index = props.index;

    return (
        <Accordion>
            <Card key={item._id}>
                <Card.Header>
                    <Row>
                        <Col xs={9}>
                            <Item key={item._id} name={item.name} catg={item.tags} price={item.price}
                                  size={item.size}/>
                        </Col>
                        <Col xs={3}>
                            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                extend
                            </Accordion.Toggle>
                        </Col>
                        <Col xs={2}>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>{item.description}
                        <button onClick={props.deleteHanlder.bind(this)} value={item._id}>Delete</button>
                        <button onClick={() => props.modal(index)}>Modify</button>
                        <button onClick={props.toggle}>Toggle</button>
                    </Card.Body>

                </Accordion.Collapse>

            </Card>
        </Accordion>

    )


};

export default SupplierCatListView;
