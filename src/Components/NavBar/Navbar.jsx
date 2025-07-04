import React from "react";
import { Link } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
import "./Navbar.css";
import { useAuth } from "../Security/AuthContext";

function Navbar() {
  const AuthContext = useAuth();

  return (
    <div className="nav-container">
      <div className="nav container">
        <div className="name">
          <img src="/favicon.ico" alt="logo-image" />
          <Link to="/" className="name-text">
            Weather App
          </Link>
        </div>
        <div className="bar">
          <div className="search-bar">
            <LocationSearchInput
              initialLocation={AuthContext.location}
              onLocationSelect={(location) =>
                AuthContext.getWeatherData(location)
              }
            />
          </div>
        </div>
      </div>
      <div className="search-bar-2">
        {" "}
        <LocationSearchInput
          initialLocation={AuthContext.location}
          onLocationSelect={(location) => AuthContext.getWeatherData(location)}
        />
      </div>
    </div>
  );
}

export default Navbar;
