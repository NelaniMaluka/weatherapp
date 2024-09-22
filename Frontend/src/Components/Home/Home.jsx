import { useAuth } from "../Security/AuthContext";
import WeatherStats from "./Sections/WeatherStats";
import WeatherData from "./Sections/WeatherData";
import PopularCitiesForecast from "./Sections/PopularCitiesForecast";
import "./Home.css";
import NewsCard from "../News/Cards/NewsCard";
import VideoSection from "./Sections/VideoSection";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Home() {
  const useContext = useAuth();
  const isLocationData = useContext.isLocationData;
  const isPopularCitiesForecast = useContext.isPopularCitiesForecast;
  const isWeatherNews = useContext.isWeatherNews;

  if (!isLocationData || !isPopularCitiesForecast || !isWeatherNews) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="sections-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Item>
                  <WeatherStats locationData={isLocationData} />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <WeatherData locationData={isLocationData} />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="info-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Item>
                  <PopularCitiesForecast
                    popularCitiesData={isPopularCitiesForecast}
                  />
                  <VideoSection />
                </Item>
              </Grid>
              <Grid item xs={12} md={4}>
                <Item>
                  <NewsCard weatherNews={isWeatherNews} />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Home;
