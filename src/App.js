import React, { Component } from 'react';
import './assets/FontAwesome.js';
import './App.css';
import TwitchAPI from './services/TwitchAPI';
import SearchBar from "./components/SearchBar";

class App extends Component {
    handleSearch(text) {
        console.log(text.target.value);
        TwitchAPI.get('games/top')
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <SearchBar
                        onChange={this.handleSearch}
                    />
                </header>
                <div className="App-body">

                </div>
            </div>
        );
    }
}

export default App;
