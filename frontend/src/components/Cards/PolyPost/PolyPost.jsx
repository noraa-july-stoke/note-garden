//======================================================================
//  ______       _         ______            _
//  | ___ \     | |        | ___ \          | |
//  | |_/ /___  | | _   _  | |_/ /___   ___ | |_
//  |  __// _ \ | || | | | |  __// _ \ / __|| __|
//  | |  | (_) || || |_| | | |  | (_) |\__ \| |_
//  \_|   \___/ |_| \__, | \_|   \___/ |___/ \__|
//                   __/ |
//                  |___/
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React from "react";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import PostCarousel from '../../Carousels/PostCarousel'
// HELPERS
import { organizePost } from "../../ComponentHelpers/post-fixup";
// CONTEXTS
// STYLES
import "./PolyPost.css";
const PolyPost = ({ contents }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const postHTML = organizePost(contents);
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  //====================================
  //            JSX BODY
  //====================================

  return (
    <div className="poly-post-container">
      <div className="post-text-container">{postHTML.TEXT}</div>
      {postHTML.IMAGE && <PostCarousel components={postHTML.IMAGE} />}
      {postHTML.AUDIO && <PostCarousel components={postHTML.AUDIO} />}
      {postHTML.LINK && <PostCarousel components={postHTML.LINK} />}
    </div>
  );
};

export default PolyPost;
