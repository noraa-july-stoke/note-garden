import React from "react";
import { useNavigate } from "react-router-dom";
import ASCIIText from "./ASCII/ASCIIText";
import AuthForms from '../../Forms/AuthForms/AuthForms';
import "./HomePage.css";
//Import authforms

const HomePage = ({ sessionUser, bgColor }) => {
  const  navigate= useNavigate();
  const notebookClick = (e) => {
    e.preventDefault();
    navigate("/notebooks");
  };

  const newNoteClick = (e) => {
    e.preventDefault();
    navigate("/new-note");
  };


  return (
    <div className="display-body" style={{backgroundColor: bgColor}}>
    <div className="home-body-container">
      {!sessionUser && <AuthForms />}
      {sessionUser && (
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
      )}
      <ASCIIText />
    </div>
    </div>
  );
};
export default HomePage;
