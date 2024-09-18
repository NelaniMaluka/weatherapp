import "./Section.css";

function VideoSection() {
  return (
    <div className="vid-container">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/oQ6sFKPPXnU?si=dP2Qaz82kqYg9KN9"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default VideoSection;
