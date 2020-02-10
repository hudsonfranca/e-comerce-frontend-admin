import React from "react";
import { Switch, Route } from "react-router-dom";
import { Customers, Products } from "./Views";

const Routes: React.FC = () => {
  return (
    <Switch>
      {/* <Route to="/customers" exact component={Customers} /> */}
      <Route to="/Products" exact component={Products} />
    </Switch>
  );
};

export default Routes;
