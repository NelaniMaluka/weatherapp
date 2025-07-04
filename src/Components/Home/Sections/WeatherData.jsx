import "./Section.css";

function WeatherData({ locationData }) {
  if (!locationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section">
      <div className="d">
        <div className="stats">
          <div>
            <h2>Location Stats</h2>
            <span>
              Latitude: <span>{locationData.coord.lat}</span>
            </span>
            <span>
              Longitude: <span>{locationData.coord.lon}</span>
            </span>
            <span>
              Ground Level: <span>{locationData.main.grnd_level}</span>
            </span>
            <span>
              Sea Level: <span>{locationData.main.sea_level}</span>
            </span>
          </div>
          <div>
            <h2>Weather Stats</h2>
            <span>
              Pressure: <span>{locationData.main.pressure}</span>
            </span>
            <span>
              Daily Low: <span>{locationData.main.temp_min}&deg;</span>
            </span>
            <span>
              Daily High: <span>{locationData.main.temp_max}&deg;</span>
            </span>
          </div>
          <div>
            <h2>Wind Stats</h2>
            <span>
              Wind Direction(degres): <span>{locationData.wind.deg}&deg;</span>
            </span>
            <span>
              Wind Gust: <span>{locationData.wind.gust}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherData;
