import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import Timer from '../Widgets';
// !@#$ Move search bar to widgets folder later.

function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className = 'nav-header'>
            {isLoaded && (
            <div className="dropdown-container">
                <ProfileButton user={sessionUser} />
            </div>
            )}
            <SearchBar/>
            <Timer/>
            <div className="nav-div">
                <NavLink exact to="/">Home</NavLink>
            </div>

        </nav>
    );
}

export default withRouter(Navigation);
