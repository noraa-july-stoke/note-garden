import { useState, useContext } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SignupForm/SignupForm";
import { ColorContext } from "../../../context/ColorContext";
import './AuthForms.css';

const AuthForms = ({userState, handleFormSubmit}) => {
    const { bgColor } = useContext(ColorContext);
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <>
            {isLoginForm ? <LoginForm bgColor={bgColor}/> : <SignupForm bgColor={bgColor} userState={userState}/>}
            <button onClick={handleToggleForm} className="auth-button">
                {isLoginForm ? "Switch to Signup" : "Switch to Login"}
            </button>
        </>
    )
}

export default AuthForms;
