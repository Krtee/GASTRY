import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Signup from './user/signup';
import Login from './user/login';
import Home from './core/Home';

import PrivateRoute from './auth/PrivateRoutes';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import Profile from './user/Profile';
import adminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';

import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';



const Routes = () => {
    return (
    <BrowserRouter>
       
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/login' exact component={Login} />

            <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>
            <PrivateRoute path='/profile/:userId' exact component={Profile}/>

            <AdminRoute path='/admin/dashboard' exact component={adminDashboard} /> 
            <AdminRoute path='/create/category' exact component={AddCategory} /> 
            <AdminRoute path='/create/product' exact component={AddProduct} /> 
            <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct} /> 
            <AdminRoute path='/admin/orders' exact component={Orders} /> 
            <AdminRoute path='/admin/products' exact component={ManageProducts} /> 
           
        </Switch>
    </BrowserRouter>
    );
}

export default Routes;