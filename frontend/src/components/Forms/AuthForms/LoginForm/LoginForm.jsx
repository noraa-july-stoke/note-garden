import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import ErrorModal from '../../../ErrorModal';
import OpenModalMenuItem from '../../../Navigation/OpenModalMenuItem';

const LoginForm = ({ bgColor }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const { closeModal, setModalContent } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                // reset the modal content to null if login succeeds
                setModalContent(null);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    // set the modal content to the ErrorModal component if there are errors
                    setModalContent(<ErrorModal errors={Object.values(data.errors)} />);
                }
            });
    };

    useEffect(() => {
        const handleClick = (e) => {
            // check if click target is outside the modal window
            const modal = document.querySelector('.error-container');
            if (modal && !modal.contains(e.target)) {
                closeModal();
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [closeModal]);

    return (
        <form onSubmit={handleSubmit}>
            <label className="auth-credentials">
                Username or Email
                <input
                    className="auth-form-input"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    style={{ backgroundColor: bgColor }}
                />
            </label>
            <label className="auth-credentials">
                Password
                <input
                    className="auth-form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: bgColor }}
                    required
                />
            </label>
            <div className="auth-form-links">
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;
