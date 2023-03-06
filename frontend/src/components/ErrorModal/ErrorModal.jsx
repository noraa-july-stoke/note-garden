import React, { useContext } from 'react';
import { Modal, useModal } from '../../context/Modal';
import { ColorContext } from '../../context/ColorContext';
import './ErrorModal.css';
import image from "./silly-goose.png";


const ErrorModal = ({ errors }) => {
    console.log(errors)
    const { bgColor } = useContext(ColorContext);
    const { closeModal } = useModal();
    console.log(errors)

    return (
        <div className="error-container">
            <div className="error-header" style={{ backgroundColor: bgColor }}>
                <h2 style={{ color: "white" }}>Oopsies... You silly goose, you!</h2>
                <img className="silly-goose" src={image} alt="silly-goose" />
            </div>
            <div className="errors-body">
                <p style={{ color: bgColor }}>Please correct the following... </p>
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <button className="error-modal-button" style={{backgroundColor:bgColor}} onClick={closeModal}> Got it? </button>
            </div>
        </div>
    );
};

export default ErrorModal;
