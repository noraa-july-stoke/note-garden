import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MiniProfile.css";
import { logout } from "../../../../store/session";

const MiniProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
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
          <button onClick={handleLogout}>Log Out</button>{" "}
          <span>{user.email}</span>
        </div>
      )}
    </div>
  );
};
export default MiniProfile;
