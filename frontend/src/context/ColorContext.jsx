import React, { useState, createContext } from 'react';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const bgColors = [
        '#FFC300', // readable
        '#F7931E', // readable
        '#FF5733', // readable
        '#C70039', // readable
        '#87CEEB', // readable
        '#FF69B4', // readable
        '#00FFFF', // readable
        '#E6E6FA', // readable
        '#32CD32', // readable
        '#2E8B57', // readable
        '#36454F', // readable
        '#FFC0CB', // readable
        '#DC143C', // readable
        '#EEE8AA', // readable
        '#DAA520', // readable
        '#40E0D0', // readable
        '#00A86B', // readable
        '#008080', // readable
        '#006266', // readable
        '#009432', // readable
        '#BB2B1F', // readable
        '#ED4C67', // readable
        '#0066CC', // readable
        '#27AE60', // readable
        '#E67E22', // readable
        '#D35400', // readable
        '#8E44AD', // readable
        '#2C3E50', // readable
        '#34495E', // readable
        '#7F8C8D'  // readable
    ];

    const [bgColor, setBgColor] = useState("#8E44AD");
    const [textColor, setTextColor] = useState('white');

    const changeBgColor = () => {
        const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        setBgColor(randomColor);
    };

    const changeTextColor = () => {
        setTextColor(textColor === 'black' ? 'white' : 'black');
    };

    return (
        <ColorContext.Provider value={{ bgColor, textColor, changeBgColor, changeTextColor }}>
            {children}
        </ColorContext.Provider>
    );
};
