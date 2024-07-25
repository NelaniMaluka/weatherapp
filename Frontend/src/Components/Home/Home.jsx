import { useAuth } from "../Security/AuthContext";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import "./Home.css";

function Home() {
  const AuthContext = useAuth();
  const isLocationData = AuthContext.isLocationData;

  return (
    <div className="home-page">
      <div className="container">
        <Section1 locationData={isLocationData} />
        <Section2 locationData={isLocationData} />
      </div>
    </div>
  );
}

export default Home;
