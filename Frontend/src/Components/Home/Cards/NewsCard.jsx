import "./Card.css";

function NewsCard({ weatherNews }) {
  function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();

    const timeDifferenceInMs = now - givenDate;
    const differenceInMinutes = Math.floor(timeDifferenceInMs / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
      return `${differenceInDays} day${differenceInDays === 1 ? "" : "s"} ago`;
    } else if (differenceInHours > 0) {
      return `${differenceInHours} hour${
        differenceInHours === 1 ? "" : "s"
      } ago`;
    } else {
      return `${differenceInMinutes} minute${
        differenceInMinutes === 1 ? "" : "s"
      } ago`;
    }
  }

  return (
    <div className="w-news-card">
      <h3>Top Stories</h3>
      <hr />
      {weatherNews.slice(0, 10).map((data) => (
        <div>
          <div className="w-container">
            <div className="w-info">
              <div className="truncate-text">{data.title}</div>
              <div className="time-ago">{timeAgo(data.publishedAt)}</div>
            </div>
            <div className="w-img">
              <img src={data.urlToImage} alt="" />
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default NewsCard;
