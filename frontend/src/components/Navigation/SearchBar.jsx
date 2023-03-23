//=======================================================================
//   _____                          _      ______
//  /  ___|                        | |     | ___ \
//  \ `--.   ___   __ _  _ __  ___ | |__   | |_/ /  __ _  _ __
//   `--. \ / _ \ / _` || '__|/ __|| '_ \  | ___ \ / _` || '__|
//  /\__/ /|  __/| (_| || |  | (__ | | | | | |_/ /| (_| || |
//  \____/  \___| \__,_||_|   \___||_| |_| \____/  \__,_||_|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import { helpers } from "../ComponentHelpers/index.js";
const { actionGenerator, searchReducer } = helpers;

//=======================================================================

const SearchBar = () => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  //===========================
  //          HOOKS
  //===========================

  //===========================
  // HELPERS/EVENT LISTENERS
  //    ADDITIONAL LOGIC
  //===========================

  const handleSearch = (event, searchInputRef) => {
    event.preventDefault();
    const query = searchInputRef.current.value;
    // maybe make a fetch request to the server to get the search results
    // const
    let route = "/";
    const command = actionGenerator(query);
    if (command) route = searchReducer(command);
    navigate(route);
    setSearchQuery("");
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event, searchInputRef);
    }
  };

  //===========================
  //         JSX BODY
  //===========================

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="What would you like to do?"
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      ref={searchInputRef}
    />
  );
};

export default SearchBar;
