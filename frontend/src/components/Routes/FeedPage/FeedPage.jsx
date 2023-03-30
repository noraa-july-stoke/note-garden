//=============================================================
//  ______               _  ______
//  |  ___|             | | | ___ \
//  | |_  ___   ___   __| | | |_/ /__ _   __ _   ___
//  |  _|/ _ \ / _ \ / _` | |  __// _` | / _` | / _ \
//  | | |  __/|  __/| (_| | | |  | (_| || (_| ||  __/
//  \_|  \___| \___| \__,_| \_|   \__,_| \__, | \___|
//                                        __/ |
//                                       |___/
//=============================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React from "react";
import { useNavigate } from "react-router";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import SidePanel from "../../Navigation/SidePanel/SidePanel";
import MiniProfile from "./MiniProfile";
import PostFeed from "./PostFeed";
// STYLES
import "./FeedPage.css";
//=======================================================================

const FeedPage = ({ bgColor, sessionUser }) => {
  const navigate = useNavigate();
  const panelItems = [
    {
      name: "Dashboard",
      onClick: () => {
        navigate("/dashboard");
      },
      className: "panel-tab",
    },
    {
      name: "Create Post",
      onClick: () => {
        navigate("/new-post");
      },
      className: "panel-tab",
    },
    {
      name: "Filters",
      onClick: () => null,
      className: "panel-tab expandable",
    },
  ];

  return (
    <div className="display-body" style={{ backgroundColor: bgColor }}>
      <SidePanel panelItems={panelItems}>
        <MiniProfile user={sessionUser} postMode={false} />
      </SidePanel>
      <PostFeed />
    </div>
  );
};
export default FeedPage;
