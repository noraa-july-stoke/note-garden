import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import Timer from '../Widgets';
import { ColorContext } from '../../context/ColorContext';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const { bgColor, changeBgColor, changeTextColor } = useContext(ColorContext);
    const [isSpinning, ] = useState(false);

    return (
      <nav className="nav-header" style={{ backgroundColor: bgColor }}>
        <div
          className={`triangle${isSpinning ? " spin" : ""}`}
          onDoubleClick={(e) => {
            e.preventDefault()
            changeBgColor();
            changeTextColor();
          }}
        />
        <Timer />
        <SearchBar />
        <div className="nav-div">
          <NavLink
            to="/"
            style={{
              fontFamily: "Courier New",
              fontWeight: "bold",
              fontSize: "1.5em",
            }}>
            NoteGarden
          </NavLink>
        </div>
        {isLoaded && (
          <div className="dropdown-container">
            <ProfileButton bgColor={bgColor} user={sessionUser} />
          </div>
        )}
      </nav>
    );
}

export default Navigation;
