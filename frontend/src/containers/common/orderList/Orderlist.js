import React, {Component} from "react";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import CustomerLayout from "../../customer/CustomerLayout";
import SupplierLayout from "../../supplier/supplierLayout/SupplierLayout";
import OrderListItem from "../../../components/orders/OrderListItem";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import gastry from "../../../assets/icons/logo.svg"
import {SwipeableList, SwipeableListItem} from "@sandstreamdev/react-swipeable-list";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Badge} from "@material-ui/core";
import "./Orderlist.scss";

class Orderlist extends Component {
    componentDidMount() {
        let payload = {
            token: this.props.token,
        };
        this.props.fetchOrders(payload);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.orders !== this.props.orders) && (this.props.orders.length !== 0) && (prevProps.orders.length !== this.props.orders.length)) {
            for (let order of this.props.orders) {
                let notificationpayload = {
                    token: this.props.token,
                    chatId: order._id
                }
                this.props.fetchNotifications(notificationpayload)
            }
        }
    }

    componentWillUnmount() {
        this.props.flush()
    }

    changeStatus = (e, id) => {
        if (e === 1) {
            let payload = {
                token: this.props.token,
                orderId: id,
                data: {
                    status: "closed"
                }
            }
            this.props.modifyOrder(payload)
        } else if (e === -1) {
            let payload = {
                token: this.props.token,
                orderId: id,
                data: {
                    status: "canceled"
                }
            }
            this.props.modifyOrder(payload)
        }
    }


    render() {

        const orders = this.props.orders.map((item, key) => (
            <Link
                to={{
                    pathname: `/order/chat`,
                    state: {order: item},
                }}
                key={item._id}
            >
                {this.props.userType === "customer" ? (
                    <OrderListItem
                        logo={gastry}
                        name={item.supplier_id.company}
                        orderNr={item._id}
                        status={item.status}
                        newMessages={item.newMessages}
                    />
                ) : (
                        <SwipeableListItem
                            threshold={0.5}
                            swipeLeft={{
                                content:
                                    <Container style={{paddingRight: "0"}}>
                                        <Card style={{backgroundColor: "#ff8282", padding: "0.35rem 0.8rem"}}>
                                            <Card.Header style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: "white"
                                            }}>
                                                <Row className={"d-flex justify-content-end"}>
                                                    <p style={{marginBottom: "0"}}>Bestellung</p>
                                                </Row>
                                                <Row className={"d-flex justify-content-end"}>
                                                    <p style={{marginBottom: "0"}}>stornieren</p>
                                                </Row>
                                            </Card.Header>
                                        </Card>
                                    </Container>,
                                action: () => this.changeStatus(-1, item._id)
                            }}
                            swipeRight={{
                                content:
                                    <Container style={{paddingLeft: "0"}}>
                                        <Card style={{backgroundColor: "#9CBB49", padding: "0.35rem 0.8rem"}}>
                                            <Card.Header style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: "white"
                                            }}>
                                                <Row className={"d-flex justify-content-start"}>
                                                    <p style={{marginBottom: "0"}}>Bestellung</p>
                                                </Row>
                                                <Row className={"d-flex justify-content-start"}>
                                                    <p style={{marginBottom: "0"}}>abschließen</p>
                                                </Row>
                                            </Card.Header>
                                        </Card>
                                    </Container>,
                                action: () => this.changeStatus(1, item._id)
                            }}>
                            <OrderListItem
                                logo={gastry}
                                name={item.customer_id.company}
                                orderNr={item._id}
                                status={item.status}
                                newMessages={item.hasOwnProperty('newMessages') ? item.newMessages : 0}
                            />
                        </SwipeableListItem>
                )}
            </Link>));
        return this.props.userType === "supplier" ? (
            <SupplierLayout title="Orders" location={"orders"} description={"Bestelleingänge"}>
                <Container fluid className={"orderlist d-flex justify-content-center"}>
                    <SwipeableList >
                        {orders}
                    </SwipeableList>
                </Container>
            </SupplierLayout>
        ) : (
            <CustomerLayout title="Orders" location={"orders"} description={"Meine \n Bestellungen"}>
                <Container fluid className={"orderlist"}>{orders}</Container>
            </CustomerLayout>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
        orders: state.orders.orders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (payload) => dispatch(actions.fetchOrders(payload)),
        flush: () => dispatch(actions.flushOrders()),
        modifyOrder: (payload) => dispatch(actions.modifyOrders(payload)),
        fetchNotifications: (payload) => dispatch(actions.fetchNotifications(payload))
    };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Orderlist);
