import './App.css';
import Analytics from './Analytics';
import Header from './Header';
import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Settings from './Settings';
import config from '../config.json';
import UnpaidDrawings from './UnpaidDrawings';
import InvoicedDrawings from './InvoicedDrawings';
import PaidDrawings from './PaidDrawings';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={config.urls.settings} component={Settings} />
        <Route exact path={config.urls.unpaid} component={UnpaidDrawings} />
        <Route exact path={config.urls.invoiced} component={InvoicedDrawings} />
        <Route exact path={config.urls.paid} component={PaidDrawings} />
        <Route exact path={config.urls.home} component={Analytics} />
      </Switch>
    </Router>
  );
}

export default App;
