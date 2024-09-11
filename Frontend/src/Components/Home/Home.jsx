import { useAuth } from "../Security/AuthContext";
import WeatherStats from "./Sections/WeatherStats";
import WeatherData from "./Sections/WeatherData";
import PopularCitiesForecast from "./Sections/PopularCitiesForecast";
import "./Home.css";

function Home() {
  const useContext = useAuth();
  const isLocationData = useContext.isLocationData;
  const isPopularCitiesForecast = useContext.isPopularCitiesForecast;
  console.log(isPopularCitiesForecast);

  if (!isLocationData || !isPopularCitiesForecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="sections-container">
          <WeatherStats locationData={isLocationData} />
          <WeatherData locationData={isLocationData} />
        </div>
        <div className="info-container">
          <PopularCitiesForecast popularCitiesData={isPopularCitiesForecast} />
        </div>
      </div>
    </div>
  );
}

export default Home;
