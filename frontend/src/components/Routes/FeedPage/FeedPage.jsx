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

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import SidePanel from "../../Navigation/SidePanel/SidePanel";
import MiniProfile from "./MiniProfile";
import PostFeed from "./PostFeed";
import "./FeedPage.css";

//=======================================================================

const FeedPage = ({ bgColor, sessionUser }) => {
  return (
    <div className="display-body" style={{ backgroundColor: bgColor }}>
      <SidePanel>
        <MiniProfile user={sessionUser} postMode={false} />
      </SidePanel>
      <PostFeed />
    </div>
  );
};
export default FeedPage;
