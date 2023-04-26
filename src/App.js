import React from "react";
import { Switch, Route } from "react-router-dom";
import Anasayfa from "./components/Anasayfa/Anasayfa";
import PizzaForm from "./components/PizzaForm/PizzaForm";
import Secenekler from "./components/Secenekler/Secenekler";
import Success from "./components/Success";

const App = () => {
  return (
    <Switch>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/order-pizza">
        <PizzaForm />
      </Route>
      <Route path="/secenekler">
        <Secenekler />
      </Route>
      <Route path="/">
        <Anasayfa />
      </Route>
    </Switch>
  );
};

export default App;