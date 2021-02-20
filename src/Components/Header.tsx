import React from "react";
import { Link } from "react-router-dom";
import config from '../config.json';

const Header = () => {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
      <p className="h5 my-0 me-md-auto fw-normal">Work Progress</p>
      <nav className="my-2 my-md-0 me-md-3">
        <Link className="p-2 text-dark" to={config.urls.home}>Analytics</Link>
        <Link className="p-2 text-dark" to={config.urls.unpaid}>Unpaid</Link>
        <Link className="p-2 text-dark" to={config.urls.invoiced}>Invoiced</Link>
        <Link className="p-2 text-dark" to={config.urls.paid}>Paid</Link>
        <Link className="p-2 text-dark" to={config.urls.settings}>Settings</Link>
      </nav>
    </header>
  )
};

export default Header