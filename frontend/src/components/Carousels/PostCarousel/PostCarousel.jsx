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
// HELPERS
// CONTEXTS
// STYLES
import "./PostCarousel.css";
//=======================================================================
const PostCarousel = ({ components }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeComponent = components[currentIndex];
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const goToPrevSlide = () => {
    const index = currentIndex === 0 ? components.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const index = currentIndex === components.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  //====================================
  //            JSX BODY
  //====================================

  return (
    <div className="carousel">
      <div className="carousel-items">
        {components.length > 1 && (
          <button
            className="carousel-button carousel-button-left"
            onClick={goToPrevSlide}>
            <i className="fa fa-chevron-left"></i>
          </button>
        )}
        <div className="carousel-item active">{activeComponent}</div>
        {components.length > 1 && (
          <button
            className="carousel-button carousel-button-right"
            onClick={goToNextSlide}>
            <i className="fa fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};
export default PostCarousel;
