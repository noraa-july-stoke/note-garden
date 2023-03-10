import { useState, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { helpers } from '../ComponentHelpers/index.js';
const { actionGenerator, searchReducer} = helpers;

const SearchBar = () => {
    const history = useHistory()
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef();
    const handleSearch = (event, searchInputRef) => {
        event.preventDefault();
        const query = searchInputRef.current.value;
        console.log('Searching for:', query);
        // maybe make a fetch request to the server to get the search results
        // const
        let route = '/'
        const command = actionGenerator(query)
        if (command) route = searchReducer(command)
        console.log(route, command)
        history.push(route)
        setSearchQuery("")
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event, searchInputRef);
        }
    };

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
}

export default SearchBar;
