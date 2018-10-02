import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className='SearchBar-container'>
                <Link to={{ pathname: '/' }} >
                    <FontAwesomeIcon icon='home'/>
                </Link>
                <input type='text' onChange={(text) => this.props.onChange(text)} className='SearchBar-input' placeholder='Pick a stream ...'/>
                <FontAwesomeIcon icon='search'/>
            </div>
        );
    }
}

export default SearchBar;
