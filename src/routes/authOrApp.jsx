import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRouter from "./privateRouter";
import Login from "../main/login/login";
import DashboardApp from "./dashboardApp";

const AuthOrApp = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRouter path="/" component={DashboardApp} />
        <Route path="*" component={() => <h1>Página 404</h1>} />
      </Switch>
    </>
  );
};

export default AuthOrApp;
