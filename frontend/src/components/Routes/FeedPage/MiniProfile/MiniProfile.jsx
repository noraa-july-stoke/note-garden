//=============================================================
//  ___  ___ _         _  ______              __  _  _
//  |  \/  |(_)       (_) | ___ \            / _|(_)| |
//  | .  . | _  _ __   _  | |_/ /_ __  ___  | |_  _ | |  ___
//  | |\/| || || '_ \ | | |  __/| '__|/ _ \ |  _|| || | / _ \
//  | |  | || || | | || | | |   | |  | (_) || |  | || ||  __/
//  \_|  |_/|_||_| |_||_| \_|   |_|   \___/ |_|  |_||_| \___|
//=============================================================
// POLYMORPHIC COMPONENT - CHANGES BASED ON "postMode" PROP
//=============================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import { formatTimestamp } from "../../../ComponentHelpers/misc-helpers";
import { logout } from "../../../../store/session";
import "./MiniProfile.css";

//=======================================================================
const MiniProfile = ({ user, postMode, postDate }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //    STATE VARIABLE ASSIGNMENTS
  //==========================================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  //===========================
  //          HOOKS
  //===========================

  //===========================
  // HELPERS/EVENT LISTENERS
  //===========================

  const toggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  //================================================
  //         JSX BODY
  //================================================
  // CREATE A DIFFERENT STRUCTURE WITH
  // ALTERNATE STYLES DEPENDING ON "postMode"
  const content = postMode ? (
    <div className="feed-mini-profile-container">
      <div className="mini-name-pic-container">
        <div className="feed-avatar-pic-container">
          <img
            onClick={toggleMenu}
            className="avatar-pic"
            src={user.avatarUrl}
            alt="profile avatar"
          />
        </div>
        <h5>
          {user.firstName} {user.lastName}
        </h5>
      </div>
      <div className="post-profile-info-container">
        <span className="mini-post-sub-info">
        <h4 className="post-profile-username">{user.username}</h4>
        <span className="post-profile-time">
          {formatTimestamp(postDate)}
        </span>
        </span>
      </div>
    </div>
  ) : (
    <div className="mini-profile-container">
      <div className="user-data">
        <div className="avatar-pic-container">
          <img
            onClick={toggleMenu}
            className="avatar-pic"
            src={user.avatarUrl}
            alt="profile avatar"
          />
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      {showMenu && (
        <div className="mini-menu-container">
          <button onClick={handleLogout}>Log Out</button>
          <span>{user.email}</span>
        </div>
      )}
    </div>
  );

  return content;
};
export default MiniProfile;
