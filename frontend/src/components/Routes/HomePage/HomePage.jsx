//=============================================================================
//   _   _                          ______
//  | | | |                         | ___ \
//  | |_| |  ___   _ __ ___    ___  | |_/ /__ _   __ _   ___
//  |  _  | / _ \ | '_ ` _ \  / _ \ |  __// _` | / _` | / _ \
//  | | | || (_) || | | | | ||  __/ | |  | (_| || (_| ||  __/
//  \_| |_/ \___/ |_| |_| |_| \___| \_|   \__,_| \__, | \___|
//                                                __/ |
//                                               |___/
// Route Component- Polymorphic
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React from "react";
import { useNavigate } from "react-router-dom";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import ASCIIVideo from "./ASCII/ASCIIVideo";
import ASCIILogo from "./ASCII/ASCIILogo";
import AuthForms from "../../Forms/AuthForms/AuthForms";
// HELPERS
// CONTEXTS
// STYLES
import "./HomePage.css";

const HomePage = ({ sessionUser, bgColor }) => {
  const navigate = useNavigate();
  //=============================================================================
  // Variable Declarations, initializers, state variable assignments;
  //=============================================================================

  // const navigate = useNavigate();

  //=============================================================================
  // Hooks
  //=============================================================================
  // const notebookClick = (e) => {
  //   e.preventDefault();
  //   navigate("/notebooks");
  // };

  //=============================================================================
  // HELPERS/EVENT LISTENERS
  //=============================================================================

  // const newNoteClick = (e) => {
  //   e.preventDefault();
  //   navigate("/new-note");
  // };

  //=============================================================================
  // JSX BODY - Should conditionally render either login form or the home page
  //=============================================================================
  return (
    <div className="display-body" style={{ backgroundColor: bgColor }}>
      <div className="home-body-header-container">
        <ASCIILogo sessionUser={sessionUser} />
        <div className="home-body-container">
          {!sessionUser && <AuthForms />}
          {/* if session user exists display a button that navigates to "/home" */}
          {sessionUser && <button className="home-nav-button" onClick={() => navigate('/feed') }>Go To Feed </button> }
          <ASCIIVideo />
        </div>
      </div>
    </div>
  );
};
export default HomePage;

  /* {sessionUser && (
          <div className="buttons-container">
            <button
              style={{ backgroundColor: bgColor }}
              className="home-nav-button"
              onClick={notebookClick}>
              Go To Notebooks
            </button>
            <button
              style={{ backgroundColor: bgColor }}
              className="home-nav-button"
              onClick={newNoteClick}>
              Create New Note
            </button>
          </div>
        )} */
