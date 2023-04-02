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
const PostLink = ({ url }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const [linkData, setLinkData] = useState({});
  //====================================
  //              HOOKS
  //====================================
  useEffect(() => {
    fetchData();
  }, [url]);
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const fetchData = async () => {
    const data = await fetchOpenGraphData(url);
    setLinkData(data);
  };

  const { og, alt } = linkData;
  const title = og?.title || alt?.title;
  const image = og?.image || alt?.image;
  const description = og?.description || alt?.description;
  const siteUrl = og?.url || alt?.url;

  //====================================
  //            JSX BODY
  //====================================
  return (
    <div className="post-link-container">
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          {image && <img src={image} alt={title} />}
          <div className="post-link__info">
            <h2 style={{ color: "black" }}>{title}</h2>
            {description && <p>{description.slice(0, 300)}...</p>}
          </div>
        </a>
    </div>
  );
};
export default PostLink;
