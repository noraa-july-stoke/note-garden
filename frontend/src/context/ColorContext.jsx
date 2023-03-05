import React, { useState, createContext } from 'react';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const bgColors = [
        '#FFC300',
        '#F7931E',
        '#FF5733',
        '#C70039',
        '#900C3F',
        '#87CEEB',
        '#FF69B4',
        '#FF007F',
        '#00FFFF',
        '#E6E6FA',
        '#32CD32',
        '#2E8B57',
        '#36454F',
        '#FFC0CB',
        '#DC143C',
        '#EEE8AA',
        '#DAA520',
        '#40E0D0',
        '#00A86B',
        '#008080',
        '#581845',
        '#006266',
        '#009432',
        '#1B1464',
        '#833471',
        '#BB2B1F',
        '#ED4C67',
        '#0066CC',
        '#27AE60',
        '#E67E22',
        '#D35400',
        '#8E44AD',
        '#2C3E50',
        '#34495E',
        '#7F8C8D'
    ];
    const textColors = ['black', 'white', 'magenta', 'cyan', 'crimson', "yellow", "purple", "blue", "green"];
    const [bgColor, setBgColor] = useState('black');
    const [textColor, setTextColor] = useState('white');

    const changeBgColor = () => {
        const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        setBgColor(randomColor);
    };

    const changeTextColor = () => {
        const randomColor = textColors[Math.floor(Math.random() * textColors.length)];
        setTextColor(randomColor);
    };

    return (
        <ColorContext.Provider value={{ bgColor, textColor, changeBgColor, changeTextColor }}>
            {children}
        </ColorContext.Provider>
    );
};
