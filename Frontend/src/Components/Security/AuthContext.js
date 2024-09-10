import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWeatherData } from "../API/Api";
import { GetFutureWeatherData } from "../API/Api";
import { CreateAccount } from "../API/Api";
import { LogIn } from "../API/Api";
import { ForgotPassword } from "../API/Api";
import ErrorAlert from "../Alerts/ErrorAlert";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [location, setLocation] = useState("Randfontein");
  const [isLocationData, setLocationData] = useState();
  const [isFutureLocationData, setFutureLocationData] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isUser, setUser] = useState(null);
  const [isForecast, setForecast] = useState();

  useEffect(() => {
    getWeatherData(location);
    //getForecast();
  }, []); // Runs once on mount

  async function getWeatherData(location) {
    try {
      const response = await GetWeatherData(location);
      setLocationData(response.data);
      getFutureWeatherData(location);
      setLocation(location);
    } catch (e) {
      ErrorAlert("Couldnt get weather data");
    }
  }

  async function getFutureWeatherData(location) {
    try {
      const response = await GetFutureWeatherData(location);
      setFutureLocationData(response.data.list);
    } catch (e) {
      ErrorAlert("Couldnt get weather data");
    }
  }

  async function login(email, password) {
    try {
      const response = await LogIn(email, password);
      if (response.status === 200) {
        setUser(response.data);
        setAuthenticated(true);
        return { success: true, response };
      } else {
        logout();
        return { success: false, response };
      }
    } catch (e) {
      logout();
      return { success: false, response: e.response };
    }
  }

  function logout() {
    setAuthenticated(false);
    setUser(null);
  }

  async function createAccount(fullName, email, password) {
    try {
      const response = await CreateAccount(fullName, email, password);
      if (response.status === 200) {
        setUser(response.data);
        setAuthenticated(true);
        return { success: true, response };
      } else {
        logout();
        return { success: false, response };
      }
    } catch (e) {
      logout();
      return { success: false, response: e.response };
    }
  }

  async function forgotPassword(email) {
    try {
      const response = await ForgotPassword(email);
      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (e) {
      return { success: false + e.message };
    }
  }

  async function getForecast() {
    const forecast = [];

    const popularCities = [
      "Pretoria, South Africa",
      "Johannesburg, South Africa",
      "Cape Town, South Africa",
      "Durban, South Africa",
      "Bloemfontein, South Africa",
      "Polokwane, South Africa",
      "Upington, South Africa",
      "Port Elizabeth, South Africa",
      "East London, South Africa",
    ];
    console.log("yoyo" + getFutureWeatherData(popularCities[1]));

    for (const city in popularCities) {
      const response = await getFutureWeatherData(city);
      console.log(response);
      forecast.push(response);
    }
    setForecast(forecast);
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
        isUser,
        isForecast,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
