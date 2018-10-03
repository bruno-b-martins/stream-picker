import React, { Component } from 'react';
import Select from 'react-select';
import './SearchOptions.css';

class SearchOptions extends Component {
    render() {
        return (
            <div className='SearchOptions-container'>
                <div className='SearchOptions-search-types-container'></div>
                <div className='SearchOptions-number-of-results-container'>
                    <div className='SearchOptions-number-of-results-label'># Results:</div>
                    <Select
                        className='SearchOptions-number-of-results-select'
                        value={this.props.options.numberOfResults.value}
                        onChange={this.props.options.numberOfResults.handler}
                        options={this.props.options.numberOfResults.options}
                    />
                </div>
            </div>
        );
    }
}

export default SearchOptions;
