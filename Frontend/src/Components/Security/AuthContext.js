import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWeatherData } from "../API/Api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isLocationData, setLocationData] = useState();

  useEffect(() => {
    getWeatherData();
  }, []); // Runs once on mount

  async function getWeatherData(location) {
    try {
      const response = await GetWeatherData("Randfontein");
      setLocationData(response.data);
    } catch (e) {}
  }

  return (
    <AuthContext.Provider value={{ isLocationData, getWeatherData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
