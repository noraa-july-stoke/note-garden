import { useEffect, useState } from 'react';
import artFrames from './art';

const colors = ['#F7931E', '#FF5733', '#C70039', '#87CEEB', '#FF69B4', '#FF007F',
    '#FFC300', '#00FFFF', '#E6E6FA', '#32CD32', '#900C3F', '#2E8B57', '#36454F', '#FFC0CB',
    '#DC143C', '#EEE8AA', '#DAA520', '#40E0D0', '#00A86B', '#008080', '#581845', '#006266',
    '#009432', '#1B1464', '#833471', '#BB2B1F', '#ED4C67', '#0066CC', '#27AE60', '#E67E22',
    '#D35400', '#8E44AD', '#2C3E50', '#34495E', '#7F8C8D'];

const ASCIIText = () => {
    const [color, setColor] = useState('#FFFFFF');

    const styles = {
        container: {
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            color: "#FFFFFF",
            fontSize: "6px",
            textAlign: "center",
            maxWidth: "150px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
        },
    };

    useEffect(() => {
        let intervalId;
        const play = async () => {
            const frames = artFrames.length;
            let i = 0;
            while (true) {
                document.getElementById("output").innerHTML = `<font color="${color}"><pre>${artFrames[i]}</font></pre>`;
                i = (i + 1) % frames;
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
        };
        intervalId = play();
        return () => {
            clearInterval(intervalId);
        };
    }, [color]);

    const handleClick = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
    };

    return (
        <div style={styles.container} onClick={handleClick}>
            <pre id="output" style={styles.text}></pre>
        </div>
    );
};

export default ASCIIText;
