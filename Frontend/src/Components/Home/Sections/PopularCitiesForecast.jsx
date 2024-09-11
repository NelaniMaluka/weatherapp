import "./Section.css";

function PopularCitiesForecast({ popularCitiesData }) {
  function incrementDateAndGetDay(day) {
    // Create a new Date object for the current date
    let date = new Date();

    // Increment the date by one day
    date.setDate(date.getDate() + day);

    // Get the day of the week as a number (0-6)
    let dayNumber = date.getDay();

    // Array of day names for reference
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the name of the day
    let dayName = daysOfWeek[dayNumber];

    return dayName;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Popular Cities</th>
            <th>Today</th>
            <th>{incrementDateAndGetDay(1)}</th>
            <th>{incrementDateAndGetDay(2)}</th>
          </tr>
        </thead>
        <tbody>
          {popularCitiesData.map((city) => (
            <tr key={city.data.city.id}>
              <td>{city.data.city.name}</td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${city.data.list[0].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-logo"
                />
                <span>{city.data.list[0].main.temp}%</span>
              </td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${city.data.list[1].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-logo"
                />
                <span>{city.data.list[0].main.temp}%</span>
              </td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${city.data.list[2].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-logo"
                />
                <span>{city.data.list[0].main.temp}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularCitiesForecast;
