import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWeatherData } from "../API/Api";
import { GetFutureWeatherData } from "../API/Api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [location, setLocation] = useState("Randfontein");
  const [isLocationData, setLocationData] = useState();
  const [isFutureLocationData, setFutureLocationData] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getWeatherData(location);
  }, []); // Runs once on mount

  async function getWeatherData(location) {
    try {
      console.log(location);
      const response = await GetWeatherData(location);
      setLocationData(response.data);
      getFutureWeatherData(location);
      setLocation(location);
    } catch (e) {
      console.log(e);
    }
  }

  async function getFutureWeatherData(location) {
    try {
      const response = await GetFutureWeatherData(location);
      setFutureLocationData(response.data.list);
    } catch (e) {
      console.log(e);
    }
  }

  async function login(username, password) {
    try {
    } catch (e) {}
  }

  async function createAccount(username, password) {
    try {
    } catch (e) {}
  }

  return (
    <AuthContext.Provider
      value={{
        isLocationData,
        getWeatherData,
        isFutureLocationData,
        getFutureWeatherData,
        location,
        setLocation,
        isAuthenticated,
        login,
        createAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
