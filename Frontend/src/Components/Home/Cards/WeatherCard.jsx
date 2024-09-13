import "./WeatherCard.css";
import { IncrementDateAndGetDay } from "../../../Utils/IncrementDateAndGetDate";

function WeatherCard({ futureLocationData, day }) {
  if (!futureLocationData) {
    return <div>Loading...</div>;
  }

  let days;
  if (day === 1) {
    days = "Tommorow";
  } else if (day === 2) {
    days = IncrementDateAndGetDay(2);
  } else if (day === 3) {
    days = IncrementDateAndGetDay(3);
  }

  return (
    <div className="w-container">
      <div className="w-card">
        {" "}
        <img
          src={`http://openweathermap.org/img/wn/${futureLocationData[day].weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="w-logo"
        />
        <span className="day-of-week">{days}</span>
        <span>{futureLocationData[day].main.temp}&deg;</span>
      </div>
    </div>
  );
}

export default WeatherCard;
