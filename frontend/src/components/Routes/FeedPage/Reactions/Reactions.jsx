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
import "./Reactions.css";
import ReactionCounter from "./ReactionCounter";
//=======================================================================
const Reactions = ({ postReactions }) => {
  const user = useSelector((state) => state.session?.user);

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

  const handleReaction = async (reactionType) => {
    if (userReactions.includes(reactionType)) {
      // Remove user's reaction
      setUserReactions((prevReactions) =>
        prevReactions?.filter((r) => r !== reactionType)
      );
      setReactions((prevReactions) => {
        return {
          ...prevReactions,
          [reactionType]: prevReactions[reactionType] - 1,
        };
      });
    } else {
      // Add user's reaction
      setUserReactions((prevReactions) => [...prevReactions, reactionType]);
      setReactions((prevReactions) => {
        return {
          ...prevReactions,
          [reactionType]: prevReactions[reactionType] + 1,
        };
      });
    }
  };

  const totalReactionsCount = Object.values(reactions).reduce(
    (total, reactionCount) => total + reactionCount,
    0
  );

  return (
    <div className="reactions">
      <div className="reaction-counter">
        {Object.keys(reactions)
          ?.filter((reactionType) => reactions[reactionType] > 0)
          .map((reactionType) => (
            <ReactionCounter
              key={reactionType}
              reactionType={reactionType}
              count={reactions[reactionType]}
              isReacted={userReactions.includes(reactionType)}
              onClick={() => handleReaction(reactionType)}
            />
          ))}
        {totalReactionsCount}
      </div>
    </div>
  );
};

export default Reactions;
