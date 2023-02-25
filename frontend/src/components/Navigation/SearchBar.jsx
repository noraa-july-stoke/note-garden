import { useState, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { helpers } from '../ComponentHelpers/index.js';

const { actionGenerator, searchReducer } = helpers;

const SearchBar = () => {
    const history = useHistory()
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef();
    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchInputRef.current.value;
        console.log('Searching for:', query);
        // Implement search logic here later
        // maybe make a fetch request to the server to get the search results
        // const

        const command = actionGenerator(query)
        //!@#$ this is not working right???
        console.log(command)
        if (command) searchReducer(command, history)
        setSearchQuery("")
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    return (
            <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={searchInputRef}
            />
    );
}

export default SearchBar;
