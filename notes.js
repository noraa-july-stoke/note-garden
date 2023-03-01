// SearchBar.js


// Sure! Here's a general overview of how you could implement this feature using React.js, Sequelize, Express, and Redux:

// Set up your database: Create a table with the data you want to search, and make sure you have a
// Sequelize model that corresponds to that table.

// Set up your server: Create an Express server with routes that will handle requests for the data.
// For example, you might create a route that responds to a GET request with a list of items from the database.

// Set up your client - side React components: Create a search bar component that will handle user input and make
//  requests to the server, and a results component that will display the search results as a dropdown.

// Set up Redux: Create an action that will make a request to the server for the search results, and a reducer
// that will store the search results in the Redux store.

// Connect the components to Redux: Connect the search bar and results components to the Redux store using the
// connect function from the react - redux library.

// Handle user input: In the search bar component, set up an event listener that will fire a request to th
//  server with the search query as the user types into the search bar.

// Render search results: In the results component, map over the search results stored in the Redux store and
// render them as a dropdown below the search bar.

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchItems } from './actions';

const SearchBar = ({ dispatch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);

        // Dispatch the searchItems action with the new search term
        dispatch(searchItems(newSearchTerm));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};

// export default connect()(SearchBar);


// Results.js

import React from 'react';
import { connect } from 'react-redux';

const Results = ({ searchResults }) => {
    return (
        <ul>
            {searchResults.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};

const mapStateToProps = (state) => ({
    searchResults: state.searchResults,
});

// export default connect(mapStateToProps)(Results);


// actions.js

export const searchItems = (searchTerm) => async (dispatch) => {
    try {
        const response = await fetch(`/api/items?searchTerm=${searchTerm}`);
        const data = await response.json();

        dispatch({
            type: 'SEARCH_ITEMS',
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};


// reducer.js

const initialState = {
    searchResults: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_ITEMS':
            return {
                ...state,
                searchResults: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
