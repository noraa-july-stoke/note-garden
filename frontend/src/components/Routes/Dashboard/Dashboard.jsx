//=======================================================================
// HEADER HERE
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import Profile from "./Profile/Profile";
import SinglePost from "../FeedPage/SinglePost/";
import Settings from "./Settings";
import FriendsSearch from "./FriendsSearch";
// HELPERS
import { thunkLoadPosts } from "../../../store/posts";
// CONTEXTS
// STYLES
import "./Dashboard.css";
//=======================================================================
const Dashboard = () => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.userPosts);
  const user = useSelector((state) => state.session.user);
  const [activeTab, setActiveTab] = useState("posts");

  //====================================
  //              HOOKS
  //====================================
  useEffect(() => {
    dispatch(thunkLoadPosts(user?.id));
  }, [dispatch, user.id]);
  console.log(posts);

  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //====================================
  //            JSX BODY
  //====================================
  return (
    <div className="dashboard-container">
      <div className="profile-container">
        <Profile user={user} />
      </div>
      <div className="tabs-container">
        <button onClick={() => handleTabClick("posts")}>Your Posts</button>
        <button onClick={() => handleTabClick("settings")}>Settings</button>
        <button onClick={() => handleTabClick("friends-search")}>
          Friends Search
        </button>
      </div>
      <div className="content-container">
        {activeTab === "posts" && (
          <div className="posts-container">
            {Object.values(posts)?.map((post) => (
              <SinglePost key={post.id} post={post} />
            ))}
          </div>
        )}
        {activeTab === "settings" && <Settings />}
        {activeTab === "friends-search" && <FriendsSearch />}
      </div>
    </div>
  );
};

export default Dashboard;
