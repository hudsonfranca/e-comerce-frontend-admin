import React from "react";
import { Switch, Route } from "react-router-dom";
import { Customers, Products, Orders, Stock, SignIn } from "./Views";
import { Error404 } from "./components";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
      <Route path="/stock" component={Stock} />
      <Route path="/orders" component={Orders} />
      <Route component={Error404} />
    </Switch>
  );
};

export default Routes;
