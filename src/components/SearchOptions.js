import React, { Component } from 'react';
import Select from 'react-select';
import './SearchOptions.css';

class SearchOptions extends Component {
    render() {
        return (
            <div className='SearchOptions-container'>
                <Select
                    value={this.props.options.numberOfResults.value}
                    onChange={this.props.options.numberOfResults.handler}
                    options={this.props.options.numberOfResults.options}
                />
            </div>
        );
    }
}

export default SearchOptions;
