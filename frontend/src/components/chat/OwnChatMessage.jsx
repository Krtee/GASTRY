import React from 'react';
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './chatMessage.scss'
import Container from "react-bootstrap/Container";

const OwnChatMessage = (props) => {
    return (
        <div className="messageRow d-flex justify-content-end">
            <div className={"messageframe"}>
                <p style={{textAlign: "right", fontSize: "14px"}}>
                    {props.text}
                </p>
                <footer className={"float-right"} style={{fontSize: "10px"}}>
                    <p>{props.date}</p>

                </footer>
            </div>
        </div>

    );
};

export default OwnChatMessage;
