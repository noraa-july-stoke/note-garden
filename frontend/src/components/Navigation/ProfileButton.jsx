import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className="utility-button feedback-button profile-button" onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div className="user-dropdown">
                        <div className="user-info-container dropdown-item">
                            <span className="user-dropdown-info">{user.username}</span>
                            <span className="user-dropdown-info">{user.firstName} {user.lastName}</span>
                            <span className="user-dropdown-info">{user.email}</span>
                        </div>

                        <div className="user-dropdown-logout dropdown-item">
                            <button className="logout-button" onClick={logout}>Log Out</button>
                        </div>
                        <div className="dropdown-item">
                            My NoteBooks
                        </div>
                        <div className="dropdown-item">
                            My Photo Albums
                        </div>
                        <div className="dropdown-item">
                            Creation Station
                        </div>
                        <div className="dropdown-item">
                            My NoteBooks
                        </div>
                        <div className="dropdown-item">
                            My Pals
                        </div>
                        <div className="dropdown-item">
                            My Posts
                        </div>
                    </div>
                ) : (
                    <>
                        <span className='modal-button'>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </span>
                        <span className='modal-button'>
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </span>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
