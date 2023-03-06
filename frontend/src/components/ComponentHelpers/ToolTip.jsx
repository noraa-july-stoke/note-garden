import React, { useState } from 'react';
import './component-helpers.css';

export const ToolTip = ({ text, children }) => {
    const [show, setShow] = useState(false);

    const handleMouseEnter = () => {
        setShow(true);
    };

    const handleMouseLeave = () => {
        setShow(false);
    };

    return (
        <div
            className="tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {show && <span className="tooltiptext">{text}</span>}
        </div>
    );
};
