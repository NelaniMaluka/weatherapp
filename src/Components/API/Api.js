import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_NEWS_API_KEY = process.env.REACT_APP_WEATHER_NEWS_API_KEY;

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

export function GetWeatherNews() {
  return axios.get(
    `https://newsapi.org/v2/everything?q=weather&apiKey=${WEATHER_NEWS_API_KEY}`
  );
}

export function SignForNewsletter(email) {
  return apiClient.post("/api/public/newsletter", { email });
}
