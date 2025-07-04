import { useParams } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import NewsCard from "./Cards/NewsCard";
import NewsArticle from "./Sections/NewsArticle";

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

function SelectedNews() {
  const articleTitle = useParams().articleTitle;
  const useContext = useAuth();
  const isWeatherNews = useContext.isWeatherNews;

  if (!articleTitle || !isWeatherNews) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Item>
              <NewsArticle
                articleTitle={articleTitle}
                weatherNews={isWeatherNews}
              />
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
  );
}

export default SelectedNews;
