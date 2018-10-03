import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css';


const HomeButton = withRouter(({ history }) => (
    <div onClick={() => { history.push('/') }} >
        <FontAwesomeIcon icon='home'/>
    </div>
));

class SearchBar extends Component {
    render() {
        return (
            <div className='SearchBar-container'>
                <HomeButton/>

                <input
                    type='text'
                    onChange={(text) => this.props.onChange(text)}
                    className='SearchBar-input'
                    placeholder='Pick a stream ...'
                />

                <div onClick={this.props.onSearch} >
                    <FontAwesomeIcon icon='search'/>
                </div>
            </div>
        );
    }
}

export default SearchBar;
