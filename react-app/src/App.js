/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import DemoForm from 'components/DemoForm';

import { Router } from 'react-router-dom';
import { history } from 'packages';
import { Routers } from 'router';

function App() {
  return (
    <Router history={history}>
      {/* <ScrollToTop> */}
      <Routers />
      {/* </ScrollToTop> */}
    </Router>

  );
}

export default App;
