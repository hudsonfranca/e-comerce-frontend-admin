import React from "react";
import { Switch, Route } from "react-router-dom";
import { Customers, Products, Orders } from "./Views";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Orders} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
    </Switch>
  );
};

export default Routes;
