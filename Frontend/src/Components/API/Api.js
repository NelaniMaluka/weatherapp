import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export function GetWeatherData(location) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`
  );
}

export function GetFutureWeatherData(location) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${WEATHER_API_KEY}&units=metric`
  );
}
