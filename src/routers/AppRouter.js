import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PerfilScreen } from "../components/user/PerfilScreen";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter}></Route>
          <Route exact path="/:id" component={PerfilScreen}></Route>

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
