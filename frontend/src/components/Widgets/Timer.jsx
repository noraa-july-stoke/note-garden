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

    const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const handleMouseOver = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
        setTimerColor(getRandomColor());
    };

    const getRandomColor = () => {
        const colors = [
            'red',
            'orange',
            'yellow',
            'lightgreen',
            'teal',
            'rgb(224, 85, 224)',
            'violet',
            'pink',
            'turquoise'
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const timerClasses = classNames('timer', {
        'flashing': isMouseOver
    });

    return (
        <div className={timerClasses} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            {formattedTime}
        </div>
    );
};

export default Timer;
