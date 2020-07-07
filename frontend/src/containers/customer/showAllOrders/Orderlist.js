import React, {Component} from 'react';
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import CustomerLayout from "../CustomerLayout";
import UserLayout from "../CustomerLayout";
import {fetchOrders} from "../../../redux/actions";
import SupplierCatListView from "../../../components/list/SupplierCatListView";
import OrderListItem from "../../../components/orders/OrderListItem";


class Orderlist extends Component {

    componentDidMount() {
        let payload = {
            token: this.props.token
        }
        this.props.fetchOrders(payload)
    }

    render() {
        const orders = this.props.orders.map((item, index) =>
            (
                <OrderListItem name={item.date}/>

            ));
        return (
            <CustomerLayout
                className='container-fluid'
                title='Orders'
                description=''
            >
                {orders}


            </CustomerLayout>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
        orders: state.fetchOrders.orders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (payload) =>
            dispatch(actions.fetchOrders(payload)),

    };
};


export default connect(mapsStateToProps,mapDispatchToProps)(Orderlist);