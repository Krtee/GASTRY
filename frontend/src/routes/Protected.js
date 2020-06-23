import React from "react";
import { Route } from "react-router-dom";
import Catalog from "../containers/catalogSupplier/Catalog";
import HomeSupplier from "../containers/home/HomeSupplier";
import Profilepage from "../containers/profile/Profilepage";
import HomeCustomer from "../containers/home/HomeCustomer";
import Search from "../containers/search/Search";

export default [
        <Route exact path={"/home"} component={HomeSupplier}></Route>,
        <Route exact path={"/search"} component={Search}></Route>,
        <Route exact path={"/profile"} component={Profilepage}></Route>,
        <Route exact path={"/catalogSupplier"} component={Catalog}></Route>,
];
