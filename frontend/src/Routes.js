import React, {Component} from 'react';
import Login from "./containers/common/login/Login";
import { Switch, Route, withRouter} from 'react-router-dom';
import OrderCustomer from "./containers/customer/home/HomeCustomer";
import Notfound from "./containers/common/error/Notfound";
import Profilepage from "./containers/customer/profile/Profilepage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";
import Signup from "./containers/common/register/Signup";
import SignupOptions from "./containers/common/register/SignupOptions";
import Catalog from "./containers/supplier/catalogSupplier/Catalog";
import HomeSupplier from "./containers/supplier/home/HomeSupplier";
import CatalogCustomer from "./containers/customer/catalogCustomer/CatalogCustomer"
import * as actions from "./redux/actions";
import Basket from "./containers/customer/basket/Basket";
import SuppliersList from "./containers/customer/home/SuppliersList";
import Orderlist from "./containers/common/orderList/Orderlist";
import Chat from "./containers/customer/chat/Chat";
import axiosInstance from "./redux/axiosInstance";

const privateRoutes = [];

class Routes extends Component {


    componentDidMount() {
        if (this.props.location.pathname === "/"){
            if (this.props.token !== null) {
                this.props.checkTokenValidity({
                    token: this.props.token
                });
                this.props.history.push("/home");
            }
            else {
                this.props.history.push("/login")
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps.token !== this.props.token && this.props.token === null){
            this.props.history.replace("/login");
        }
        if ( prevProps.token !== this.props.token && this.props.token !== null){
            this.props.history.replace("/home");
        }


    }

    //TODO : ask for authtoken and redirect to login if necessary



    render() {
        if (this.props.token !== null && this.props.user !== null ) {
            privateRoutes.push(<Route exact path={"/profile"} component={Profilepage}></Route>)
            privateRoutes.push(<Route exact path={"/order/chat"} component={Chat}></Route>)

            if (this.props.user.userType === "Supplier") {
                privateRoutes.push(<Route exact path={"/home"} component={HomeSupplier}></Route>)
                privateRoutes.push(<Route exact path={"/catalogSupplier"} component={Catalog}></Route>)
                privateRoutes.push(<Route exact path={"/orders"} component={() => <Orderlist userType={"supplier"}/>}></Route>)
            }
            else {

                privateRoutes.push(<Route exact path={"/home"} component={OrderCustomer}></Route>)
                privateRoutes.push(<Route exact path={"/home/suppliers"} component={SuppliersList}></Route>)
                privateRoutes.push(<Route exact path={"/catalog/:supplierName/basket"} component={Basket}></Route>)
                privateRoutes.push(<Route exact path={"/catalog/:supplierName"} component={CatalogCustomer}></Route>)
                privateRoutes.push(<Route exact path={"/orders"} component={() => <Orderlist userType={"customer"}/>}></Route>)
                privateRoutes.push(<Route exact path={"/chat"} component={Chat}></Route>)


            }



            //privateRoutes.push(<Route exact path={"/catalog/:supplierName"} component={CatalogCustomer}></Route>)

        }
        return (
            <>
                <Switch>

                    { /* Routes requiring login */}
                    {privateRoutes}
                    <Route exact path={"/login"} component={Login}/>
                    <Route exact path={"/register"} component={SignupOptions}/>
                    <Route exact path={"/register/:userType"} component={Signup}/>

                    { /* Catch all route */}
                    <Route path="/*" component={Notfound} status={404}/>
                </Switch>
            </>
        );
    }


};


const mapsStateToProps =(state) => {
    return{
        token:state.auth.token,
        user:state.user.user}
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkTokenValidity: (payload) => dispatch(actions.checkTokenValidity(payload))
    }
}

export default withRouter(connect(mapsStateToProps,mapDispatchToProps)(Routes));
