//=======================================================================
//  ______              _    _      _         _
//  | ___ \            | |  | |    (_)       | |
//  | |_/ /  ___   ___ | |_ | |     _  _ __  | | __
//  |  __/  / _ \ / __|| __|| |    | || '_ \ | |/ /
//  | |    | (_) |\__ \| |_ | |____| || | | ||   <
//  \_|     \___/ |___/ \__|\_____/|_||_| |_||_|\_\
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useEffect } from "react";
// =======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
// HELPERS
import { fetchOpenGraphData } from "../../../api-calls/opengraph";
// CONTEXTS
// STYLES
import "./PostLink.css";
//=======================================================================
const isValidYoutubeUrl = (url) =>
  /^https?:\/\/(www\.)?youtube\.com\/watch/.test(url);

const PostLink = ({ url }) => {
  const [linkData, setLinkData] = useState({});

  useEffect(() => {
    if (isValidYoutubeUrl(url)) {
      setLinkData({ youtubeUrl: url });
    } else {
      fetchData();
    }
  }, [url]);

  const fetchData = async () => {
    const data = await fetchOpenGraphData(url);
    if (data) {
      setLinkData(data);
    }
  };

  const { og, alt, youtubeUrl } = linkData;

  const title = og?.title || alt?.title;
  const image = og?.image || alt?.image;
  const description = og?.description || alt?.description;
  const siteUrl = og?.url || alt?.url;

  if (youtubeUrl) {
    const videoId = getYoutubeVideoId(youtubeUrl);
    return (
      <div className="post-link-container">
        <iframe
          title={title}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }

  if (linkData) {
    return (
      <div className="post-link-container">
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          {image && <img src={image} alt={title} />}
          <div className="post-link__info">
            <h2 style={{ color: "black" }}>{title}</h2>
            {description && <p>{description?.slice(0, 300)}...</p>}
          </div>
        </a>
      </div>
    );
  }
  return null;
};

const getYoutubeVideoId = (url) => {
  if (!isValidYoutubeUrl(url)) return;
  return url.match(/(?:v=)([\w-]+)/)[1];
};

export default PostLink;
