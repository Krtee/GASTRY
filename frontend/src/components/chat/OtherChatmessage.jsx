import React from 'react';
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './chatMessage.scss'

const OtherChatMessage = (props) => {
    return (
        <div className="messageRow d-flex justify-content-end">
            <div className={"messageframe"}>
                <p style={{ fontSize: "14px"}}>
                    {props.text}
                </p>
                <footer style={{fontSize: "10px"}}>
                    <p>{props.date}</p>

                </footer>
            </div>
        </div>

    );
};

export default OtherChatMessage;
