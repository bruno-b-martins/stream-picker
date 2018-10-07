import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchSuggestion from "./SearchSuggestion";
import './SearchBar.css';


const HomeButton = withRouter(({ history }) => (
    <div onClick={() => { history.push('/') }} >
        <FontAwesomeIcon icon='home'/>
    </div>
));

class SearchBar extends Component {
    handleSelectSuggestion = (suggestion) => {
        document.getElementsByClassName('SearchBar-input')[0].value = suggestion;
        this.props.onChange({ target: { value: suggestion }});
    };

    renderSearchSuggestion = (suggestion, index) => {
        return (
            <SearchSuggestion
                key={'suggestion_' + index}
                value={suggestion.user[0].login}
                onSelect={this.handleSelectSuggestion}
            />
        );
    };

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

                {this.props.suggestions.length > 0 &&
                <div className='SearchBar-suggestions-container'>
                    {this.props.suggestions.map(this.renderSearchSuggestion)}
                </div>}

                <div onClick={this.props.onSearch} >
                    <FontAwesomeIcon icon='search'/>
                </div>
            </div>
        );
    }
}

export default SearchBar;
