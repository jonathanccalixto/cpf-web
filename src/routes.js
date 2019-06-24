import React from "react";
import { Switch, Route } from "react-router-dom";

import Cpf from "./pages/Cpf";
import Uptime from "./pages/Uptime";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Cpf} />
      <Route path="/status" component={Uptime} />
    </Switch>
  );
}
