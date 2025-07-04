import "./Section.css";
import { IncrementDateAndGetDay } from "../../../Utils/IncrementDateAndGetDate";

function PopularCitiesForecast({ popularCitiesData }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Popular Cities</th>
            <th>Today</th>
            <th>{IncrementDateAndGetDay(1)}</th>
            <th>{IncrementDateAndGetDay(2)}</th>
          </tr>
        </thead>
        <tbody>
          {popularCitiesData.map((city) => (
            <tr key={city.data.city.id}>
              <td>{city.data.city.name}</td>
              <td>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${city.data.list[0].weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="w-logo"
                  />
                  <span>{Math.floor(city.data.list[0].main.temp)}°C</span>
                </div>
              </td>
              <td>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${city.data.list[1].weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="w-logo"
                  />
                  <span>{Math.floor(city.data.list[1].main.temp)}°C</span>
                </div>
              </td>
              <td>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${city.data.list[2].weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="w-logo"
                  />
                  <span>{Math.floor(city.data.list[2].main.temp)}°C</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularCitiesForecast;
