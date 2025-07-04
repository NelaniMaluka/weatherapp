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
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        faucibus nisl quis purus commodo, sed commodo felis sollicitudin.
        Praesent non vehicula dui. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Proin hendrerit mi nisl, quis porttitor arcu tempor
        nec. Sed aliquet egestas ultricies. Integer rutrum velit in libero
        elementum venenatis. In fermentum orci non lectus bibendum, ac maximus
        massa malesuada. Maecenas ac ligula malesuada, aliquam neque
        condimentum, suscipit eros. Integer id vulputate odio, ut mollis neque.
        Ut volutpat maximus quam, at ultricies mi tristique eu. Nulla vitae
        tellus vestibulum, dapibus nunc vitae, semper ligula. Phasellus egestas
        nec diam non pulvinar. Donec rutrum ultricies augue eleifend facilisis.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce
        euismod tempor malesuada.
      </p>
      <p className="description">
        Praesent gravida placerat laoreet. Vivamus ultrices pulvinar augue, id
        suscipit velit varius in. Nullam vehicula rutrum sollicitudin. Donec et
        fermentum ante, lobortis ullamcorper ipsum. Vestibulum non magna turpis.
        Donec at molestie mauris, eu facilisis erat. Sed sed erat sit amet ex
        vulputate luctus ut non enim. Cras nunc enim, fermentum eu malesuada
        eget, posuere sit amet tortor. Etiam eu mi neque. Nulla sit amet dictum
        lorem. Integer ultricies malesuada est ut malesuada. Praesent consequat
        turpis ac felis sollicitudin pellentesque. Suspendisse facilisis dictum
        urna. Donec tempus nibh ut leo pharetra rhoncus. Donec a euismod massa.
        Pellentesque rhoncus massa sit amet odio hendrerit, eget euismod elit
        cursus.
      </p>
      <img className="vid" src="/rapid-decarbonisation.jpg" alt="Weather" />
      <p className="description">
        Praesent gravida, arcu nec molestie mattis, massa eros cursus augue,
        quis finibus massa augue ac neque. Nullam blandit nulla eu diam rutrum,
        sit amet pharetra risus auctor. Duis sodales arcu turpis, sit amet
        vestibulum diam dictum et. Mauris efficitur enim condimentum scelerisque
        suscipit. Morbi sagittis purus eget nunc suscipit, non scelerisque
        mauris posuere. Sed dolor lorem, egestas a est vitae, iaculis dictum
        tellus. Duis fringilla luctus quam quis lobortis. Integer nec diam a
        lectus dictum bibendum. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Nunc malesuada vestibulum
        ante, eu efficitur dui egestas in. Phasellus scelerisque viverra mi.
        Cras euismod vulputate viverra. Etiam mollis convallis lectus, eu
        molestie justo pharetra sed. Fusce aliquam dictum odio, eu sodales
        ligula molestie a.
      </p>
      <p className="description">
        In feugiat gravida dui sed luctus. Sed pellentesque, purus et
        scelerisque hendrerit, erat libero volutpat lorem, egestas lobortis nisi
        magna sit amet tortor. Integer viverra est vitae lacus lacinia, faucibus
        ultricies ipsum tincidunt. Vestibulum accumsan eros a placerat
        condimentum. Donec vitae quam suscipit, consequat orci non, semper odio.
        Quisque in nibh id urna condimentum rhoncus id et urna. Aliquam a nulla
        sit amet ipsum semper lobortis. Ut at erat in tortor consequat commodo.
      </p>
      <iframe
        className="vid"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/tdH-DUO0cUI?si=6-foXKS60XTbd_hU"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <p className="description">
        Donec non velit euismod, rutrum tellus ut, fringilla arcu. Sed lobortis
        nibh vitae fringilla consequat. Quisque magna ipsum, laoreet a elit
        eget, pulvinar suscipit velit. Nullam viverra erat ut tempor vehicula.
        Sed sit amet malesuada eros. Quisque blandit dapibus sapien, sit amet
        sagittis lacus mollis eget. Aliquam sit amet quam sem. Suspendisse nisi
        massa, pulvinar vitae condimentum vitae, pulvinar volutpat neque.
        Suspendisse et odio tortor. Quisque mollis turpis vel augue vulputate,
        eget vulputate purus convallis. Mauris mi ex, cursus sed tortor eu,
        vestibulum fermentum velit.
      </p>
    </div>
  );
}

export default NewsArticle;
