import './App.css';
import Analytics from './Analytics';
import Header from './Header';
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Settings from './Settings';
import config from '../config.json';
import Bills from './Bills';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={config.urls.settings} component={Settings} />
        <Route exact path={config.urls.bills} component={Bills} />
        <Route exact path={config.urls.home} component={Analytics} />
      </Switch>
    </Router>
  );
}

export default App;
