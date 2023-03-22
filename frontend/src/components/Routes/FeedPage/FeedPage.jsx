import React from "react";
import SidePanel from "../../Navigation/SidePanel/SidePanel";
import MiniProfile from "./MiniProfile";
import PostFeed from "./PostFeed";
import "./FeedPage.css";
const FeedPage = ({ bgColor, sessionUser }) => {
  return (
    <div className="display-body" style={{ backgroundColor: bgColor }}>
      <SidePanel>
        <MiniProfile user={sessionUser} />
      </SidePanel>
        <PostFeed />
    </div>
  );
};
export default FeedPage;
