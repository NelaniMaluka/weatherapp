import { useEffect } from "react";
import { useState } from "react";

import "./Section.css";

function NewsArticle({ articleTitle, weatherNews }) {
  const [article, setArticle] = useState("");

  useEffect(() => {
    findArticle();
  }, [articleTitle, weatherNews]);

  function findArticle() {
    const foundAtricle = weatherNews.find(
      (news) => news.title === articleTitle
    );
    if (foundAtricle) {
      setArticle(foundAtricle);
      console.log(article);
    }
  }

  function formatPublishedDate(publishedAt) {
    const date = new Date(publishedAt);
    return (
      date.toLocaleString("en-US", {
        timeZone: "Africa/Johannesburg",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) + " SAST"
    ); // Adding SAST to the formatted string
  }

  if (!article) {
    return "Loading...";
  }

  return (
    <div className="article">
      <span className="title">{article.title}</span>
      <p className="description">{article.description}</p>
      <span>by {article.author}</span>
      <br />
      <span className="date">
        published {formatPublishedDate(article.publishedAt)}
      </span>
      <iframe
        className="vid"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/1L7h5LAmIcg?si=u3c91lqjkTUFZbL2"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default NewsArticle;
