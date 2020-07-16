import React, {useState, useEffect, Component} from 'react';
import UserLayout from "../CustomerLayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../supplier/home/home.scss"
import Button from "react-bootstrap/Button";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import CustomerLayout from "../CustomerLayout";
import food from "../../../assets/icons/food.svg";
import drinks from "../../../assets/icons/drinks.svg";
import foodanddrinks from "../../../assets/icons/foodanddrinks.svg";
import basket from "../../../assets/icons/Warenkorb.svg";
import {LinkContainer} from "react-router-bootstrap";
import "./homeCustomer.scss"
import {Fade} from "@material-ui/core";

class HomeCustomer extends Component {


    onSubmit = async (event, id) => {
        event.preventDefault();
        const payload = {
            token: this.props.token,
            data: {
                category: id
            }
        };
        console.log(payload);
        console.log("called");
        await this.props.fetchSupplier(payload);
        console.log(this.props.suppliers)
        if (this.props.suppliers != null) {
            this.props.history.replace('/home/suppliers', {
                category: id
            })
        }
    };

    render() {
        return (
            <CustomerLayout
                className='container-fluid'
                description={`Was möchtest \n du bestellen?`}
                location={"home"}
            >
                <Fade in={true}>

                    <Row style={{width: "100%", height: "50%", marginTop: "5vh"}}>
                        <Col className={"d-flex flex-column justify-content-center "}
                             style={{height: "100%", marginTop: "1em"}}>
                            <button type={"button"} onClick={(e) => this.onSubmit(e, "food")}>
                                <img
                                    src={food} width="150" height="150" alt={"food"} className={"align-self-center"}
                                />
                            </button>
                            <p className={'supplierButtons text-center'}>Food</p>
                        </Col>
                        <Col className={"d-flex flex-column justify-content-center"}
                             style={{height: "100%", marginTop: "1em"}}>
                            <button type={"button"} onClick={(e) => this.onSubmit(e, "drinks")}>
                                <img
                                    src={drinks} width="150" height="150" alt={"drinks"} className={"align-self-center"}
                                />
                            </button>
                            <p className={'supplierButtons text-center'}>Drinks</p>
                        </Col>
                    </Row>
                </Fade>

                <Fade in={true}>
                    <Row style={{width: "100%", height: "50%", marginBottom: "10vh"}}>
                        <Col className={"d-flex flex-column justify-content-center "} style={{height: "100%"}}>
                            <button type={"button"} onClick={(e) => this.onSubmit(e, "both")}>
                                <img
                                    src={foodanddrinks} width="150" height="150" alt={"foodAndDrinks"}
                                    className={"align-self-center"}
                                />
                            </button>
                            <p className={'supplierButtons text-center'}>Food and Drinks</p>
                        </Col>
                    </Row>
                </Fade>
            </CustomerLayout>
        )
    }


}

const mapsStateToProps = (state) => {
    return {
        suppliers: state.suppliersList.list,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSupplier: (data) => dispatch(actions.fetchSuppliersList(data))
    }
};


export default connect(mapsStateToProps, mapDispatchToProps)(HomeCustomer);
