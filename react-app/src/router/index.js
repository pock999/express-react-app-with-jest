/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  matchPath, Switch, Route, Redirect,
  Router,
} from 'react-router-dom';

import { history } from 'packages';
import AuthService from './AuthService';
import routes from './routes';

const Routers = (props) => (
  <Router history={history}>
    <Switch>
      {routes && routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact || false}
          key={route.path}
          render={(props) => {
            const { allow, failPath } = AuthService.validateRoute(route);
            if (allow) return (<route.component {...props} routes={route.routes} />);

            return <Redirect to={failPath} />;
          }}
        />
      ))}
    </Switch>
  </Router>
);

export { Routers };
