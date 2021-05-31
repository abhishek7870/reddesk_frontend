import React from "react";
import { Route, Switch } from "react-router-dom";
import CallFilter from "../filters/call-filters";

function RouterComponent() {
  return (
    <Switch>
      <Route path="/dashboard/admin/calls" exact component={CallFilter} />
    </Switch>
  );
}

export default RouterComponent;
