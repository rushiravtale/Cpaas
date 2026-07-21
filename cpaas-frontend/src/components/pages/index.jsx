

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RestrictedRoute from "../../routes/RestrictedRoute";
import { protectedRoutes, publicRoutes } from "../../routes/routesConfig";
import NoAccess from "./noAccess/noAccess";

export default function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />

      {protectedRoutes.map((r, i) => (
        <RestrictedRoute
          key={i}
          exact
          path={r.path}
          component={r.component}
          roles={r.roles}
        />
      ))}

      {publicRoutes.map((r, i) => (
        <Route key={i} exact path={r.path} component={r.component} />
      ))}

      <Route path="/no-access" component={NoAccess} />

      <Redirect to="/dashboard" />
    </Switch>
  );
}
