//    ___   _____  _____  _____  _____
//   / _ \ /  ___|/  __ \|_   _||_   _|
//  / /_\ \\ `--. | /  \/  | |    | | ______
//  |  _  | `--. \| |      | |    | ||______|
//  | | | |/\__/ /| \__/\ _| |_  _| |_
//  \_| |_/\____/  \____/ \___/  \___/
//   _   _  _____ ______  _____  _____
//  | | | ||_   _||  _  \|  ___||  _  |
//  | | | |  | |  | | | || |__  | | | |
//  | | | |  | |  | | | ||  __| | | | |
//  \ \_/ / _| |_ | |/ / | |___ \ \_/ /
//   \___/  \___/ |___/  \____/  \___/
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import { useEffect, useContext } from "react";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import artFrames from "./art";
// CONTEXTS
import { ColorContext } from "../../../../context/ColorContext";

//=======================================================================
const ASCIIVideo = () => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const { textColor } = useContext(ColorContext);
  const styles = {
    container: {
      width: "450px",
      height: "450px",
      borderRadius: "50%",
      borderLeft: "2px solid white",
      borderRight: "2px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0px 0px 20px 10px rgba(255,255,255,0.3)`,
    },
    text: {
      fontSize: "8px",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    },
  };
  // boxShadow: `0px 0px 20px 10px rgba(255,255,255,0.5)`
  //====================================
  //              HOOKS
  //====================================
  useEffect(() => {
    let frameIndex = 0;
    let timeoutId = null;
    const play = () => {
      document.getElementById(
        "output"
      ).innerHTML = `<font color="${textColor}"><pre>${artFrames[frameIndex]}</pre></font>`;
      frameIndex = (frameIndex + 1) % artFrames.length;
      timeoutId = setTimeout(play, 40);
    };
    play();
    return () => {
      clearTimeout(timeoutId);
    };
  });

  //====================================
  //            JSX BODY
  //====================================
  return (
    <div className="jellyfish-container" style={styles.container}>
      <pre id="output" style={styles.text}></pre>
    </div>
  );
};

export default ASCIIVideo;
