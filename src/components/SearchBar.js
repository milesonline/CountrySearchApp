import React from 'react';

const SearchBar = ({ handleSearch }) => {
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSearch(e.target.value);
        }
    };
    return (
        <div>
            <input
            type="text"
            placeholder="Search for a country"
            onKeyDown={handleKeyDown}
            className="search-input"
            />
        </div>
    );
};

export default SearchBar;