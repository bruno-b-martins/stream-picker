import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <input type="text" onChange={(text) => this.props.onChange(text)} className="App-search" placeholder="Pick a game ..."/>
        );
    }
}

export default SearchBar;
