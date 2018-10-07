import React  from 'react';
import './SearchSuggestion.css';

function SearchSuggestion(props) {
    return (
        <div
            className='SearchSuggestion-container'
            onClick={() => props.onSelect(props.value)}
        >
            {props.value}
        </div>
    );
}

export default SearchSuggestion;
