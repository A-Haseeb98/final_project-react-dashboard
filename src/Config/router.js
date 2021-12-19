import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login,Dashboard } from "../Component";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
