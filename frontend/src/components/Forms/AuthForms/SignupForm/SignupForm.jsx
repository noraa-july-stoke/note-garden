import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import * as sessionActions from '../../../../store/session';
import ErrorModal from '../../../ErrorModal';

const SignupForm = ({bgColor}) => {
    const dispatch = useDispatch();
    const { closeModal, setModalContent, openModal, setOnModalClose } = useModal();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

     const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        if (password == confirmPassword) {
            setErrors([]);
            data = await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            console.log(data)
            if (data.errors){
                setErrors(Object.values(data.errors));
                setModalContent(<ErrorModal errors={Object.values(data.errors)} />);
            }
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
            setModalContent(<ErrorModal errors={errors} />)
        }
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
    }, []);




    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-container">
                <h2>Sign Up</h2>
                <label className="auth-credentials">
                    <span>Email: </span>
                    <input
                        className="auth-form-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <label className="auth-credentials">
                    <span>Username: </span>
                    <input
                        className="auth-form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <label className="auth-credentials">
                    <span>First Name: </span>
                    <input
                        className="auth-form-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <label className="auth-credentials">
                    <span>Last Name: </span>
                    <input
                        className="auth-form-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <label className="auth-credentials">
                    <span>Password: </span>
                    <input
                        className="auth-form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <label className="auth-credentials">
                    <span>Confirm Password:</span>
                    <input
                        className="auth-form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ backgroundColor: bgColor }}
                    />
                </label>
                <button className="auth-button" type="submit">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
