import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/FontAwesome.js';
import './App.css';
import TwitchAPI from './services/TwitchAPI';
import SearchBar from './components/SearchBar';
import SearchOptions from './components/SearchOptions';
import StreamThumbnailsContainer from './components/StreamThumbnailsContainer';
import StreamPlayer from './components/StreamPlayer';

class App extends Component {
    constructor(props) {
        super(props);

        let initialValues = this.loadInitialValues();

        this.state = {
            getStreamsParams: {
                params: {
                    first: initialValues.numberOfResults
                }
            },
            searchOptions: {
                numberOfResults: {
                    value: { value: initialValues.numberOfResults, label: initialValues.numberOfResults },
                    options: [
                        { value: 3, label: 3 },
                        { value: 6, label: 6 },
                        { value: 9, label: 9 }
                    ],
                    handler: this.handleNumberOfResultsChange
                }
            },
            streams: []
        };

        this.getStreams(this.state.getStreamsParams);
    }

    /**
     * Returns the initial values loaded from localStorage or their default values
     *
     * @returns {{numberOfResults: number}}
     */
    loadInitialValues() {
        let initialValues = {
            numberOfResults: 3
        };

        if (Number(localStorage.getItem('numberOfResultsValue'))) {
            initialValues.numberOfResults = localStorage.getItem('numberOfResultsValue');
        }

        return initialValues;
    }

    // TODO - Proper error handling (flash/toast messages)
    handleError(err) {
        console.error(err);
    }

    /**
     * Gets streams and pass them to their handler
     *
     * @param params
     */
    getStreams(params) {
        TwitchAPI.get('/streams', params)
            .then(this.onGetStreams)
            .catch(this.handleError);
    }

    /**
     * Updates this.state with the incoming stream results
     *
     * @param streams
     */
    onGetStreams = (streams) => {
        this.setState({
            streams: streams.data.data.map((stream) => {
                return {
                    thumbnailUrl: stream.thumbnail_url,
                    title: stream.title,
                    gameId: stream.game_id,
                    viewersCount: {
                        value: stream.viewer_count
                    },
                    startedAt: stream.started_at,
                    language: stream.language,
                    userId: stream.user_id
                };
            })
        });
    };

    /**
     * Updates this.state.getStreamParams with the incoming text and calls the this.getStreams method to get them
     *
     * @param text
     */
    handleSearch = (text) => {
        let newState = {
            getStreamsParams: {
                params: {
                    first: this.state.getStreamsParams.params.first
                }
            }
        };

        if (text.target.value.length > 0) {
            newState.getStreamsParams.params['user_login'] = text.target.value;
        }

        this.setState(newState);

        this.getStreams(newState.getStreamsParams);
    };

    /**
     * Updates this.state.getStreamParams with the number of streams to get from this.getStreams and calls it
     *
     * @param option
     */
    handleNumberOfResultsChange = (option) => {
        let newState = {
            getStreamsParams: {
                params: {
                    first: option.value
                }
            },
            searchOptions: {
                numberOfResults: {
                    value: option,
                    options: this.state.searchOptions.numberOfResults.options,
                    handler: this.state.searchOptions.numberOfResults.handler
                }
            }
        };

        if (this.state.getStreamsParams.params.user_login && this.state.getStreamsParams.params.user_login.length > 0) {
            newState.getStreamsParams.params['user_login'] = this.state.getStreamsParams.params.user_login;
        }

        this.setState(newState);

        localStorage.setItem('numberOfResultsValue', option.value);

        this.getStreams(newState.getStreamsParams);
    };

    render() {
        return (
            <Router>
                <div className='App'>
                    <header className='App-header'>
                        <SearchBar
                            onChange={this.handleSearch}
                        />
                        <SearchOptions
                            options={this.state.searchOptions}
                        />
                    </header>
                    <div className='App-body'>
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
                    </div>
                </div>
            </Router>
        );
    }

}

export default App;
