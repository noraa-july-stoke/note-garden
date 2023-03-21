import { useEffect, useContext } from 'react';
import artFrames from './art';
import { ColorContext } from '../../../../context/ColorContext';



//getting the color change worked out for ascii text was kinda tricky

const ASCIIText = () => {
    const {textColor} = useContext(ColorContext);
    const styles = {
        container: {
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            border: "5px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0px 0px 20px 10px rgba(255,255,255,0.3)`
        },
        text: {
            fontSize: "8px",
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

        //cleanup makes sure it doesnt hog memory after user leaves the splash page.
        return () => {
            clearTimeout(timeoutId);
        };
    });

    return (
        <div className="jellyfish-container" style={styles.container}>
            <pre id="output" style={styles.text}></pre>
        </div>
    );
};

export default ASCIIText;
