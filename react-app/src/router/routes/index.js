/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import history from 'packages/@history';

// TODO: import layout, permissions

import Loadable from 'react-loadable';
// TODO: import Loading

const routes = [
  {
    component: () => {
      const Page = Loadable({
        loader: () => import('views/Home'),
        // loading: Loading,
        loading: () => (<>...載入中</>),
      });
      return (
        <Page />
      );
    },
    path: '/',
    exact: true,
    permissions: null,
  },
  {
    component: () => {
      const Page = Loadable({
        loader: () => import('views/Login'),
        // loading: Loading,
        loading: () => (<>...載入中</>),
      });
      return (
        <Page />
      );
    },
    path: '/login',
    exact: true,
    permissions: null,
  },
  {
    component: () => {
      const Page = Loadable({
        loader: () => import('views/Profile'),
        // loading: Loading,
        loading: () => (<>...載入中</>),
      });
      return (
        <Page />
      );
    },
    path: '/profile',
    exact: true,
    permissions: null,
  },
];

export default routes;
