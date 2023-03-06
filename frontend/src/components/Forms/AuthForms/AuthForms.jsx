import {useContext} from "react";
import LoginForm from "./LoginForm/LoginForm";
import { ColorContext } from "../../../context/ColorContext";
import './AuthForms.css';

const AuthForms = () => {
    const {bgColor} = useContext(ColorContext);
    return <LoginForm bgColor={bgColor}/>
}

export default AuthForms;
