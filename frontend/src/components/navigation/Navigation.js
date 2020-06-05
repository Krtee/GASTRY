import React, {} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./nav.scss";
import {LinkContainer} from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";


const Navigation = () => {
    return (
        <Navbar>
            <Nav className="justify-content-center fixed-bottom">
                <LinkContainer className={'navItem'} to="/home">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer className={'navItem'} to="/catalog">
                    <NavItem>Catalog</NavItem>
                </LinkContainer>
                <LinkContainer className={'navItem'} to="/search">
                    <NavItem>Search</NavItem>
                </LinkContainer><LinkContainer className={'navItem'} to="/profile">
                <NavItem>Profile</NavItem>
            </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default Navigation;
