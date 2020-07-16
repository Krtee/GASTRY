import React, {useEffect} from 'react';
import './Layout.scss'
import NavigationBottom from "../../components/navigation/NavigationBottom";
import Topbar from "../../components/navigation/TopBar";
import * as actions from "../../redux/actions";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import homeButtonInactive from "../../assets/icons/HomeButton.svg";
import homebuttonActive from "../../assets/icons/HomeButtonAusgewählt.svg";
import orderButtonInactive from "../../assets/icons/Bestelleingang.svg";
import orderButtonActive from "../../assets/icons/BestelleingangAusgewählt.svg";
import profileButtonInactive from "../../assets/icons/ProfilButton.svg";
import profileButtonActive from "../../assets/icons/ProfilButtonAusgewählt.svg";
import { useHistory } from "react-router-dom";


const CustomerLayout = ({
                            title = 'Title',
                            showBasket = false,
                            className,
                            children,
                            basketState,
                            showBack= false,
                            location= ""

                        }) => {
    let history = useHistory();

    const bottomButtons = [
            {
                picref: (location==="home" ? homebuttonActive : homeButtonInactive),
                name: 'Home',
                link: '/home'
            },
            {
                picref: (location==="orders" ? orderButtonActive : orderButtonInactive),
                name: 'Bestellungen',
                link: '/orders'
            },
            {
                picref: (location==="profile" ? profileButtonActive : profileButtonInactive),
                name: 'Profil',
                link: '/profile'
            },

        ]

        return (
            <>
                <Topbar backButton={() => history.goBack()} showBack={showBack} showBasket={showBasket} basketState={basketState}/>
                <NavigationBottom pagelist={bottomButtons} />
                <Container fluid className={"h-100  d-flex flex-column"}>
                    <Row>
                        <Container>
                            <h3 className="page-title">{title}</h3>
                        </Container>
                    </Row>
                    <Row className={"flex-grow-1"} >
                        {children}
                    </Row>
                </Container>
            </>
        )
    }
;


export default CustomerLayout;