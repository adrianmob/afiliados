import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { RegistroScreen } from "../components/auth/RegistroScreen";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen}></Route>
        <Route exact path="/auth/registro" component={RegistroScreen}></Route>

        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};
