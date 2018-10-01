import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/FontAwesome.js';
import './App.css';
import TwitchAPI from './services/TwitchAPI';
import SearchBar from './components/SearchBar';
import StreamThumbnailsContainer from './components/StreamThumbnailsContainer';
import StreamPlayer from './components/StreamPlayer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getStreamsParams: {
                params: {
                    first: 2
                }
            },
            streams: []
        };

        this.getStreams(this.state.getStreamsParams);
    }

    // TODO - Proper error handling (flash/toast messages)
    handleError(err) {
        console.error(err);
    }

    getStreams(params) {
        TwitchAPI.get('/streams', params)
            .then(this.onGetStreams)
            .catch(this.handleError);
    }

    onGetStreams = (streams) => {
        this.setState({
            streams: streams.data.data.map((stream) => {
                return {
                    thumbnailUrl: stream.thumbnail_url,
                    title: stream.title,
                    gameId: stream.game_id,
                    viewers: stream.viewer_count,
                    startedAt: stream.started_at,
                    language: stream.language,
                    userId: stream.user_id
                };
            })
        });
    };

    // TODO - WIP
    handleSearch(text) {
        console.log('search', text.target.value);
        TwitchAPI.get('games/top')
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <SearchBar
                        onChange={this.handleSearch}
                    />
                </header>
                <div className='App-body'>
                    <Router>
                        <div id='App-router-container'>
                            <Route
                                exact path='/'
                                render={() => <StreamThumbnailsContainer
                                    streams={this.state.streams}
                                />}
                            />
                            <Route
                                path='/:userId'
                                component={StreamPlayer}
                                onError={this.handleError}
                            />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }

}

export default App;
