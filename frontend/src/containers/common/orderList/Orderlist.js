import React, {Component} from "react";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import CustomerLayout from "../../customer/CustomerLayout";
import SupplierLayout from "../../supplier/supplierLayout/SupplierLayout";
import OrderListItem from "../../../components/orders/OrderListItem";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import gastry from "../../../assets/icons/logo.svg"
import {Fade} from "@material-ui/core";


class Orderlist extends Component {
    componentDidMount() {
        let payload = {
            token: this.props.token,
        };
        this.props.fetchOrders(payload);
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
                    />
                ) : (
                    <OrderListItem
                        logo={gastry}
                        name={item.customer_id.company}
                        orderNr={item._id}
                    />
                )}
            </Link>
        ));
        return this.props.userType === "supplier" ? (
            <SupplierLayout title="Orders" location={"orders"} description={"Bestellungen"}>
                <Fade in={true}>
                    <Container fluid>
                        {orders}
                    </Container>
                </Fade>
            </SupplierLayout>
        ) : (
            <CustomerLayout title="Orders" location={"orders"} description={"Meine Bestellungen"}>
                <Container fluid>{orders}</Container>
            </CustomerLayout>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
        orders: state.fetchOrders.orders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (payload) => dispatch(actions.fetchOrders(payload)),
    };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Orderlist);
