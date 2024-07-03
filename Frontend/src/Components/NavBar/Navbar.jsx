import React from "react";
import { Link } from "react-router-dom";
import GoogleMaps from "./GoogleMaps";
import BasicMenu from "./BasicMenu";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav container">
        <div className="name">
          <Link to="/" className="name-text">
            Weather App
          </Link>
        </div>
        <div className="search-bar">
          <GoogleMaps />
        </div>
        <div className="log-in">
          <BasicMenu />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
