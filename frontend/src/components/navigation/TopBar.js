import React from "react";

import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import chat from "../../assets/icons/ChatBlase.svg";
import "./nav.scss";
import Row from "react-bootstrap/Row";
import basket from "../../assets/icons/Warenkorb.svg";
import back from "../../assets/icons/arrow.svg";
import Col from "react-bootstrap/Col";
import NavigationButton from "./NavigationButton";
import logo from "../../assets/icons/logo.svg";

const Topbar = (props) => {
    return (
        <Navbar fixed={"top"} expand={"*"} style={{backgroundColor: "transparent"}}>
            <Container className={"topBar"}>
                <Row style={{ width: "100%", padding: "10px" }}>
                    {props.showBack ? (
                        <Col className={"d-flex justify-content-start align-middle"}>
                            <Button variant="transparent" onClick={props.backButton} size="sm" className={"align-self-center"}>
                                <img
                                    src={back} width="30" height="30" alt={"back"}
                                />
                            </Button>
                        </Col>
                    ) : <Col/>
                    }
                    <Col className={"d-flex justify-content-center "}>
                            <img src={logo} width="45" height="45" alt={"Gastry-Logo"} className={"align-self-center"}/>
                    </Col>
                    {props.showBasket ? (
                        <Col className={"d-flex justify-content-end align-middle"}>
                            <LinkContainer  to={{
                                pathname:
                                    props.basketState.supplierName + "/basket",
                                state: props.basketState,
                            }}>
                                <img
                                    src={basket} width="30" height="30" alt={"basket"} className={"align-self-center"}
                                />
                            </LinkContainer>
                        </Col>
                    ) : <Col/>}
                </Row>
            </Container>
        </Navbar>
    );
};

export default Topbar;
