import React from "react";
import { Switch, Route } from "react-router-dom";
import { Customers } from "./Views";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route to="/customers" exact component={Customers} />
    </Switch>
  );
};

export default Routes;
