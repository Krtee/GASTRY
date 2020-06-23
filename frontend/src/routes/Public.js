import React from "react";
import { Route } from "react-router-dom";
import Signup from "../containers/register/Signup";
import Login from "../containers/login/Login";
import Notfound from "../containers/error/Notfound";

export default [
    <Route exact path={"/login"} component={Login} />,
    <Route exact path={"/register"} component={Signup} />,
    <Route path="/*" component={Notfound} status={404} />,
];
