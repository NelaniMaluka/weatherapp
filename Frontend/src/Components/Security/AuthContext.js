import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWeatherData } from "../API/Api";
import { GetFutureWeatherData } from "../API/Api";
import ErrorAlert from "../Alerts/ErrorAlert";
import { GetWeatherNews } from "../API/Api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [location, setLocation] = useState("Randfontein");
  const [isLocationData, setLocationData] = useState();
  const [isFutureLocationData, setFutureLocationData] = useState();
  const [isPopularCitiesForecast, setPopularCitiesForecast] = useState();
  const [isWeatherNews, setWeatherNews] = useState();

  useEffect(() => {
    getWeatherData(location);
    getPopularCitiesForecast();
    getWeatherNews();
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

  async function getWeatherNews() {
    try {
      const response = await GetWeatherNews();
      setWeatherNews(response.data.articles);
    } catch (e) {
      ErrorAlert("Couldnt get weather data");
    }
  }

  async function getPopularCitiesForecast() {
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

    for (const city of popularCities) {
      const response = await GetFutureWeatherData(city);
      forecast.push(response);
    }
    setPopularCitiesForecast(forecast);
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
        isPopularCitiesForecast,
        isWeatherNews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
