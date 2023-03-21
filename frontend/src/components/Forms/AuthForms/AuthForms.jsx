import { useState, useContext } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SignupForm/SignupForm";
import { ColorContext } from "../../../context/ColorContext";
import "./AuthForms.css";

const AuthForms = ({ userState }) => {
  const { bgColor } = useContext(ColorContext);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>
      {isLoginForm ? (
        <LoginForm bgColor={bgColor} toggleForm={toggleForm}/>
      ) : (
        <SignupForm bgColor={bgColor} userState={userState} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default AuthForms;
