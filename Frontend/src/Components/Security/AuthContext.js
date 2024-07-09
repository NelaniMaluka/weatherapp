import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWeatherData } from "../API/Api";
import { GetFutureWeatherData } from "../API/Api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isLocationData, setLocationData] = useState();
  const [isFutureLocationData, setFutureLocationData] = useState();

  useEffect(() => {
    getWeatherData();
  }, []); // Runs once on mount

  async function getWeatherData(location) {
    try {
      const response = await GetWeatherData("Randfontein");
      setLocationData(response.data);
      getFutureWeatherData(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getFutureWeatherData(location) {
    try {
      const response = await GetFutureWeatherData("Randfontein");
      setFutureLocationData(response.data.list);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLocationData,
        getWeatherData,
        isFutureLocationData,
        getFutureWeatherData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
