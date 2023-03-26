//======================================================================
//   _   _                _                _    _
//  | \ | |              (_)              | |  (_)
//  |  \| |  __ _ __   __ _   __ _   __ _ | |_  _   ___   _ __
//  | . ` | / _` |\ \ / /| | / _` | / _` || __|| | / _ \ | '_ \
//  | |\  || (_| | \ V / | || (_| || (_| || |_ | || (_) || | | |
//  \_| \_/ \__,_|  \_/  |_| \__, | \__,_| \__||_| \___/ |_| |_|
//                            __/ |
//                           |___/
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import Timer from "../Widgets";
// CONTEXTS
import { ColorContext } from "../../context/ColorContext";
// STYLES
import "./Navigation.css";

//=======================================================================
function Navigation({ isLoaded }) {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const sessionUser = useSelector((state) => state.session.user);
  const { bgColor, changeBgColor, changeTextColor } = useContext(ColorContext);
  const [isSpinning] = useState(false);

  return (
    sessionUser &&
    <nav className="nav-header" style={{ backgroundColor: bgColor }}>
      <div className="nav-div">
        <div
          className={`triangle${isSpinning ? " spin" : ""}`}
          onDoubleClick={(e) => {
            e.preventDefault();
            changeBgColor();
            changeTextColor();
          }}
        />
        <Timer />
      </div>
      <SearchBar />
      <div className="nav-div">
        <NavLink
          to="/"
          style={{
            fontFamily: "Courier New",
            fontWeight: "bold",
            fontSize: "1.5em",
          }}>
          <div className="ascii-nav-logo">
            <span>╔╗╔┌─┐┌┬┐┌─┐ ╔═╗┌─┐┬─┐┌┬┐┌─┐┌┐┌</span>
            <span>║║║│ │ │ ├┤ •║ ╦├─┤├┬┘ ││├┤ │││</span>
            <span>╝╚╝└─┘ ┴ └─┘ ╚═╝┴ ┴┴└──┴┘└─┘┘└┘</span>
          </div>
        </NavLink>
        {isLoaded && (
          <div className="dropdown-container">
            <ProfileButton bgColor={bgColor} user={sessionUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
