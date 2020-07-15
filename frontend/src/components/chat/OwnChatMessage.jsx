import React from 'react';
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './chatMessage.scss'
import Container from "react-bootstrap/Container";

const OwnChatMessage = (props) => {
    return (
        <div className="messageBlock d-flex justify-content-end">
            <div>
                <p style={{textAlign: "right", fontSize: "14px"}}>
                    {props.text}
                </p>
                <footer className={"float-right"}>
                    {props.date}

                </footer>
            </div>
        </div>

    );
};

export default OwnChatMessage;
