import React, { useState, useEffect } from 'react';
import './Widgets.css';
import classNames from 'classnames';

const Timer = () => {
    const [time, setTime] = useState(new Date());
    const [timerColor, setTimerColor] = useState('white');
    const [isMouseOver, setIsMouseOver] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedTime = time.toLocaleString(undefined, options);
    let timeParts = formattedTime.split(" at");



    const handleMouseOver = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
        setTimerColor(getRandomColor());
    };

    const getRandomColor = () => {
        const colors = [
            'white',
            'rgb(199, 16, 110)',
            'orange',
            'yellow',
            'lightgreen',
            'teal',
            'rgb(230, 45, 230)',
            'violet',
            'pink',
            'turquoise',
            'rgb(68, 125, 216)',
            '#ff6347',
            '#ffa500',
            'goldenrod',
            '#00ff7f',
            '#008080',
            '#9932cc',
            '#ff69b4',
            'magenta',
            'crimson',
            'blueviolet',
        ];

        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const timerClasses = classNames('timer', {
        flashing: isMouseOver,
    });

    const textStyle = {
        color: timerColor,
    };

    return (
        <div className={timerClasses} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={textStyle}>
            {timeParts[0]}<br/>{timeParts[1]}
        </div>
    );
};

export default Timer;
