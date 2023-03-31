//=======================================================================
// HEADER HERE
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
// COMPONENTS
import FormInput from "../FormInput";
// HELPERS
// CONTEXTS
// STYLES
import "./AddLinksInput.css";
//=======================================================================
const AddLinksInput = ({ linkState, bgColor }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const [link, setLink] = useState("");
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link.trim()) {
      linkState.setLink(link);
      setLink("");
      linkState.toggleAddLink()
    }
  };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };
  //====================================
  //            JSX BODY
  //====================================
return (
  <div className="add-post-links-container">
    <FormInput
      style={{ backgroundColor: bgColor }}
      label="URL: "
      type="text"
      value={link}
      onChange={(e) => setLink(e.target.value)}
      onKeyPress={handleKeyPress}
      required
    />
    <button className="add-links-button" type="button" onClick={handleSubmit}>
      Add
    </button>
  </div>
);
};
export default AddLinksInput;
