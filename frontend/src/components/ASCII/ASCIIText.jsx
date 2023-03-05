import { useEffect, useContext } from 'react';
import artFrames from './art';
import { ColorContext } from '../../context/ColorContext';

const ASCIIText = () => {
    const {bgColor, textColor} = useContext(ColorContext);
    const styles = {
        container: {
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "5px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0px 0px 20px 10px rgba(255,255,255,0.2)`
        },
        bottom: {
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "5px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0px 0px 20px 10px ${bgColor}`
        },
        text: {
            fontSize: "6px",
            textAlign: "center",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
        }
    };
    // boxShadow: `0px 0px 20px 10px rgba(255,255,255,0.5)`



    useEffect(() => {
        let frameIndex = 0;
        let timeoutId = null;

        const play = () => {
            document.getElementById("output").innerHTML = `<font color="${textColor}"><pre>${artFrames[frameIndex]}</pre></font>`;
            frameIndex = (frameIndex + 1) % artFrames.length;
            timeoutId = setTimeout(play, 40);
        };

        play();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [bgColor]);

    return (
        <div className="jellyfish-container" style={styles.container}>
            <div style={styles.bottom}>
            <pre id="output" style={styles.text}></pre>
            </div>
        </div>
    );
};

export default ASCIIText;
