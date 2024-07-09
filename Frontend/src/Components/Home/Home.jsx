import React, { useEffect } from "react";
import { useAuth } from "../Security/AuthContext";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import "./Home.css";
import { useState } from "react";

function Home() {
  useEffect(() => {
    AuthContext.getWeatherData();
  }, []);

  const AuthContext = useAuth();
  const [isLocationData] = useState(
    AuthContext.isLocationData || AuthContext.getWeatherData()
  );

  console.log(isLocationData);

  return (
    <div className="home-page">
      <div className="container">
        <Section1 locationData={isLocationData} />
        <Section2 locationData={isLocationData} />
      </div>
      <button>hi</button>
    </div>
  );
}

export default Home;
