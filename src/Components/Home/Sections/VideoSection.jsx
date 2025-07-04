import "./Section.css";

function VideoSection() {
  return (
    <div className="vid-container">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/oQ6sFKPPXnU?si=dP2Qaz82kqYg9KN9"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullscreen
      ></iframe>
    </div>
  );
}

export default VideoSection;
