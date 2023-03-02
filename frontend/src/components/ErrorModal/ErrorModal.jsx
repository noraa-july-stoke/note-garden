import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import "./ErrorModal.css"


//!@#$ need to finish later- something is off with the selection of a new color.
const ErrorModal = ({ errors, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
    }, [modalRef, onClose]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="error-modal" ref={modalRef}>
                <h2>Oops!</h2>
                <p>Please correct the following errors before submission:</p>
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <button className="modal-close" onClick={onClose}>
                    Got it!
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ErrorModal;
