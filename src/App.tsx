import './App.css';
import Analytics from './Analytics';
import Header from './Header';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Settings from './Settings';
import config from './config.json';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path={config.urls.settings}>
          <Settings />
        </Route>
        <Route exact  path={config.urls.home}>
          <Analytics />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
