import React from "react";
import { Link } from "react-router-dom";
import BasicMenu from "./BasicMenu";
import LocationSearchInput from "./LocationSearchInput";
import "./Navbar.css";
import { useAuth } from "../Security/AuthContext";

function Navbar() {
  const AuthContext = useAuth();

  return (
    <div className="nav-container">
      <div className="nav container">
        <div className="name">
          <Link to="/" className="name-text">
            Weather App
          </Link>
        </div>
        <div className="search-bar">
          <LocationSearchInput
            initialLocation={AuthContext.location}
            onLocationSelect={(location) =>
              AuthContext.getWeatherData(location)
            }
          />
        </div>
        <div className="log-in">
          <BasicMenu />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
