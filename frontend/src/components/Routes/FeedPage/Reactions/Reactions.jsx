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
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
//STYLESHEET
//add types into this file
import "./Reactions.css";
import ReactionCounter from "./ReactionCounter";
//=======================================================================
const Reactions = ({ postReactions }) => {
  const user = useSelector((state) => state.session?.user);
  const [showReactions, setShowReactions] = useState(false);

  const initialReactions = {
    "👍": postReactions?.filter((reaction) => reaction.reactionType === "👍")
      .length,
    "👎": postReactions?.filter((reaction) => reaction.reactionType === "👎")
      .length,
    "❤️": postReactions?.filter((reaction) => reaction.reactionType === "❤️")
      .length,
    "💔": postReactions?.filter((reaction) => reaction.reactionType === "💔")
      .length,
    "🤣": postReactions?.filter((reaction) => reaction.reactionType === "🤣")
      .length,
    "😢": postReactions?.filter((reaction) => reaction.reactionType === "😢")
      .length,
    "🍋": postReactions?.filter((reaction) => reaction.reactionType === "🍋")
      .length,
    "🐔": postReactions?.filter((reaction) => reaction.reactionType === "🐔")
      .length,
    "🦆": postReactions?.filter((reaction) => reaction.reactionType === "🦆")
      .length,
    "🍗": postReactions?.filter((reaction) => reaction.reactionType === "🍗")
      .length,
    "👶🏻": postReactions?.filter((reaction) => reaction.reactionType === "👶🏻")
      .length,
    "🦅": postReactions?.filter((reaction) => reaction.reactionType === "🦅")
      .length,
    "🫁": postReactions?.filter((reaction) => reaction.reactionType === "🫁")
      .length,
  };

  const initialUserReactions = postReactions
    ?.filter((reaction) => reaction.userId === user?.id)
    .map((reaction) => reaction.reactionType);

  const [reactions, setReactions] = useState(initialReactions);
  const [userReactions, setUserReactions] = useState(initialUserReactions);
  const totalReactionsCount = Object.values(reactions).reduce(
    (total, reactionCount) => total + reactionCount,
    0
  );

  const handleReaction = async (reactionType) => {
    if (userReactions.includes(reactionType)) {
      // Remove reaction from user's list of reactions
      setUserReactions((prevReactions) =>
        prevReactions?.filter((r) => r !== reactionType)
      );
      // Remove reaction from post's list of reactions
      setReactions((prevReactions) => {
        return {
          ...prevReactions,
          [reactionType]: prevReactions[reactionType] - 1,
        };
      });
    } else {
      // Add reaction to user's list of reactions
      setUserReactions((prevReactions) => [...prevReactions, reactionType]);
      // Add reaction to post's list of reactions
      setReactions((prevReactions) => {
        return {
          ...prevReactions,
          [reactionType]: prevReactions[reactionType] + 1,
        };
      });
    }
  };

  // ...
  return (
    <div className="reactions">
      <button
        className="reaction-toggle"
        onClick={() => setShowReactions(!showReactions)}>
        {totalReactionsCount}😀
      </button>
      {showReactions && (
        <div className="reaction-counter">
          {Object.keys(reactions)?.map((reactionType) => (
            <ReactionCounter
              key={reactionType}
              reactionType={reactionType}
              count={reactions[reactionType]}
              isReacted={userReactions.includes(reactionType)}
              onClick={() => handleReaction(reactionType)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reactions;
