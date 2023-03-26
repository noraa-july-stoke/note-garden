//======================================================================
//    ___          _    _      ______
//   / _ \        | |  | |     |  ___|
//  / /_\ \ _   _ | |_ | |__   | |_  ___   _ __  _ __ ___   ___
//  |  _  || | | || __|| '_ \  |  _|/ _ \ | '__|| '_ ` _ \ / __|
//  | | | || |_| || |_ | | | | | | | (_) || |   | | | | | |\__ \
//  \_| |_/ \__,_| \__||_| |_| \_|  \___/ |_|   |_| |_| |_||___/
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useContext } from "react";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SignupForm/SignupForm";
// CONTEXTS
import { ColorContext } from "../../../context/ColorContext";
// STYLES
import "./AuthForms.css";

//=======================================================================
const AuthForms = ({ userState }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const { bgColor } = useContext(ColorContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showComponent, setShowComponent] = useState(true);

  const containerStyle = {
    opacity: showComponent ? 1 : 0,
    transform: isLoginForm ? "translateY(0)" : "translateY(-25px)",
    transition: "opacity 0.5s, transform 0.4s ease-in",
  };
  //===========================
  //          HOOKS
  //===========================

  //===========================
  // HELPERS/EVENT LISTENERS
  //    ADDITIONAL LOGIC
  //===========================

  const toggleForm = () => {
    setShowComponent(false);
    setTimeout(() => {
      setIsLoginForm(!isLoginForm);
      setShowComponent(true);
    }, 250); // Change the delay time to your desired value in milliseconds
  };

  //===========================
  //         JSX BODY
  //===========================
  return (
    <div className="auth-forms-container" style={containerStyle}>
      {isLoginForm ? (
        <LoginForm bgColor={bgColor} toggleForm={toggleForm} />
      ) : (
        <SignupForm bgColor={bgColor} toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthForms;
