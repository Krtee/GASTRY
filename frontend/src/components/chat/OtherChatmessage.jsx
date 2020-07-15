import React from 'react';
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './chatMessage.scss'

const OtherChatMessage = (props) => {
    return (
        <Row className="messageBlock">
            <Col xs={10}>
                <Card>
                    <Card.Body>
                        <Card.Text className="blockquote mb-0">
                            <p style={{fontSize:"14px"}}>
                                {props.text}
                            </p>
                            <footer className={"blockquote-footer"}>
                                {props.date}
                            </footer>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sx={2}>
            </Col>
        </Row>

    );
};

export default OtherChatMessage;
