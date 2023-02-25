import { useState, useRef } from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef();

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchInputRef.current.value;
        console.log('Searching for:', query);
        // Implement search logic here later
        // maybe make a fetch request to the server to get the search results
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
