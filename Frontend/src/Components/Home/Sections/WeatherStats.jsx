import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WeatherCard from "../Cards/WeatherCard";
import { useAuth } from "../../Security/AuthContext";

import "./Section.css";

function WeatherStats({ locationData }) {
  const AuthContext = useAuth();
  const isFutureLocationData = AuthContext.isFutureLocationData;

  return (
    <div className="section c">
      <h3>
        {locationData.name}, {locationData.sys.country}
      </h3>
      <img
        src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />

      <h1>{locationData.main.temp}&deg;</h1>
      <p className="temperature">{locationData.weather[0].description}</p>
      <div className="details">
        <div>
          <div>
            <span>
              <ThunderstormIcon />
            </span>

            <p>{locationData.clouds.all}%</p>
          </div>
          <WeatherCard futureLocationData={isFutureLocationData} day={1} />
        </div>
        <div>
          <div>
            <span>
              <WaterDropIcon />
            </span>

            <p>{locationData.main.humidity}%</p>
          </div>
          <WeatherCard futureLocationData={isFutureLocationData} day={2} />
        </div>
        <div>
          <div>
            <span>
              <AirIcon />
            </span>

            <p>{locationData.wind.speed}km/h</p>
          </div>
          <WeatherCard futureLocationData={isFutureLocationData} day={3} />
        </div>
      </div>
    </div>
  );
}
export default WeatherStats;
