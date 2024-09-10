import "./WeatherCard.css";

function WeatherCard({ futureLocationData, day }) {
  if (!futureLocationData) {
    return <div>Loading...</div>;
  }

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

  let days;
  if (day === 1) {
    days = "Tommorow";
  } else if (day === 2) {
    days = incrementDateAndGetDay(2);
  } else if (day === 3) {
    days = incrementDateAndGetDay(3);
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
