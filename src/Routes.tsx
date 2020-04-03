import React from "react";
import { Switch, Route } from "react-router-dom";
import { Customers, Products, Orders, Stock, SignIn } from "./Views";

interface Props {
  setShowNavItems: React.Dispatch<React.SetStateAction<boolean>>;
}

const Routes: React.FC<Props> = ({ setShowNavItems }) => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
      <Route path="/stock" component={Stock} />
      <Route path="/orders" component={Orders} />
    </Switch>
  );
};

export default Routes;
