import "./WeatherCard.css";

function WeatherCard({ futureLocationData, day }) {
  if (!futureLocationData) {
    return <div>Loading...</div>;
  }

  console.log(futureLocationData[day]);

  return (
    <div className="w-container">
      <div className="w-card">
        {" "}
        <img
          src={`http://openweathermap.org/img/wn/${futureLocationData[day].weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
}

export default WeatherCard;
