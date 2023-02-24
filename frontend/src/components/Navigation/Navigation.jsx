import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className = 'nav-header'>
            {isLoaded && (
                <div className="dropdown-container">
                    <ProfileButton user={sessionUser} />
                </div>
            )}

            <textarea placeholder="search" className="search-bar"></textarea>
                <div className="nav-div">
                    <NavLink exact to="/">Home</NavLink>
                </div>

        </nav>
    );
}

export default Navigation;
