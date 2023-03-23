//==============================================================
//  ______                    _    _
//  | ___ \                  | |  (_)
//  | |_/ / ___   __ _   ___ | |_  _   ___   _ __   ___
//  |    / / _ \ / _` | / __|| __|| | / _ \ | '_ \ / __|
//  | |\ \|  __/| (_| || (__ | |_ | || (_) || | | |\__ \
//  \_| \_|\___| \__,_| \___| \__||_| \___/ |_| |_||___/
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState } from "react";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
//STYLESHEET
import "./Reactions.css";

//=======================================================================

const reactionEmoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
  heart: "❤️",
  brokenHeart: "💔",
  funny: "🤣",
  sad: "😢",
  lemon: "🍋",
  chicken: "🐔",
  duck: "🦆",
  roastChicken: "🍗",
  baby: "👶🏻",
  eagle: "🦅",
  lungs: "🫁",
};

const ReactionCounter = ({ postId }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //    STATE VARIABLE ASSIGNMENTS
  //==========================================
  const [reactions, setReactions] = useState({
    thumbsUp: 0,
    thumbsDown: 0,
    heart: 0,
    brokenHeart: 0,
    funny: 0,
    sad: 0,
    lemon: 0,
    chicken: 0,
    duck: 0,
    roastChicken: 0,
    baby: 0,
    eagle: 0,
    lungs: 0,
  });
  const [showReactions, setShowReactions] = useState(false);
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  //===========================
  //       HOOK CALLS
  //===========================

  //===========================
  // HELPERS/EVENT LISTENERS
  //===========================

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  const handleReactionClick = (name) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [name]: prevReactions[name] + 1,
    }));
  };

  // CREATES A LIST OF COMPONENTs CONTAINING ALL OF
  // THE REACTION EMOJS WITH THEIR RESPECTIVE COUNT
  const reactionCounters = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      return (
        <div key={name} className="reaction-button-container">
          <button
            type="button"
            className="reaction-button"
            onClick={() => handleReactionClick(name)}>
            {emoji} {reactions[name]}
          </button>
        </div>
      );
    }
  );

  //===========================
  //         JSX BODY
  //===========================
  // <span className="total-reaction">{totalReactions} Reactions</span>;

  // DISPLAYS A BUTTON AT FIRST, BUT THEN CHANGES
  // TO DISPLAY REACTION OPTIONS TO USER

  return (
    <>
      {!showReactions && (
        <button
          type="button"
          className="add-reaction-button"
          onClick={toggleReactions}>
          <div className="count-button-text">
            <span>Add Reactions</span>
          </div>
        </button>
      )}
      {showReactions && (
        <div className="post-reactions-container">{reactionCounters}</div>
      )}
    </>
  );
};
export default ReactionCounter;
