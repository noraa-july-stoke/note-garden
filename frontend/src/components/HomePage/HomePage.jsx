import {useEffect, useState} from "react";
import ASCIIText from '../ASCII/ASCIIText';
import AuthForms from "../Forms/AuthForms/AuthForms";
import './HomePage.css';
//Import authforms
const HomePage = ({sessionUser}) => {


    return (
        <div className="home-body-container">
            {!sessionUser && <AuthForms/>}
            <ASCIIText />
        </div>
        )}
export default HomePage;
