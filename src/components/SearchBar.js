import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar-container">
                <input type="text" onChange={(text) => this.props.onChange(text)} className="App-search" placeholder="Pick a game ..."/>
                <FontAwesomeIcon icon="search" />
            </div>
        );
    }
}

export default SearchBar;
