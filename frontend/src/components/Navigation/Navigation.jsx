import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import Timer from '../Widgets';
import image from "./tarot-toad-website.png";
import { ColorContext } from '../../context/ColorContext';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const { bgColor, changeBgColor, textColor, changeTextColor } = useContext(ColorContext);
    const [isSpinning, setIsSpinning] = useState(false);


    return (
        <nav className='nav-header' style={{ backgroundColor: bgColor }}>
            {isLoaded && (
                <div className="dropdown-container">
                    <ProfileButton bgColor={bgColor} user={sessionUser} />
                </div>
            )}
            <div className={`triangle${isSpinning ? ' spin' : ''}`} onDoubleClick={ e => {changeBgColor(); changeTextColor();}}/>
            <SearchBar />
            <Timer />
            {/* <img className="tarot-frog" src={image} alt="My Image" /> */}
            <div className="nav-div">
                <NavLink exact to="/">Home</NavLink>
            </div>
        </nav>
    );
}

export default Navigation;
