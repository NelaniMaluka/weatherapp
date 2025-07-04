export function IncrementDateAndGetDay(day) {
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

export function IncrementDateAndGetDayABV(day) {
  // Create a new Date object for the current date
  let date = new Date();

  // Increment the date by one day
  date.setDate(date.getDate() + day);

  // Get the day of the week as a number (0-6)
  let dayNumber = date.getDay();

  // Array of day names for reference
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  // Get the name of the day
  let dayName = daysOfWeek[dayNumber];

  return dayName;
}
