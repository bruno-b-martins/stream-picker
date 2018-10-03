import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                    first: initialValues.numberOfResults,
                    user_login: null
                }
            },
            searchOptions: {
                numberOfResults: {
                    value: { value: initialValues.numberOfResults, label: initialValues.numberOfResults },
                    options: [
                        { value: 6, label: 6 },
                        { value: 12, label: 12 },
                        { value: 18, label: 18 }
                    ],
                    handler: this.handleNumberOfResultsChange
                }
            },
            bodyTitle: {
                value: 'Popular'
            },
            streams: []
        };

        this.getStreams(this.state.getStreamsParams);
    }

    /**
     * Class variables to optimize the user experience and reduce the server load
     */
    handleSearchTimeoutHandler = null;
    searchText = null;

    /**
     * Returns the initial values loaded from localStorage or their default values
     *
     * @returns {{numberOfResults: number}}
     */
    loadInitialValues() {
        let initialValues = {
            numberOfResults: 6
        };

        if (Number(localStorage.getItem('numberOfResultsValue'))) {
            initialValues.numberOfResults = localStorage.getItem('numberOfResultsValue');
        }

        return initialValues;
    }

    /**
     * Shows an toast error message to the user
     *
     * @param err
     */
    handleError(err) {
        toast.error("Ups! Something went wrong");
        console.error(err);
    }

    /**
     * Gets streams and their respective users and games and pass them to their handler
     *
     * @param params
     */
    getStreams(params) {
        const streamsPromise = TwitchAPI.get('/streams', params);

        const usersPromise = streamsPromise.then((res) => {
            const usersIds = res.data.data.map((stream) => stream.user_id);

            return TwitchAPI.get('/users', { params: {
                id: usersIds
            }});
        });

        const gamesPromise = streamsPromise.then((res) => {
            const gamesIds = res.data.data.map((stream) => stream.game_id);

            return TwitchAPI.get('/games', { params: {
                id: gamesIds
            }});
        });

        return Promise.all([streamsPromise, usersPromise, gamesPromise])
            .then(this.onGetStreams)
            .catch(this.handleError);
    }

    /**
     * Updates this.state with the incoming stream, users and games results
     *
     * @param streams
     * @param users
     * @param games
     */
    onGetStreams = ([streams, users, games]) => {
        this.setState({
            streams: streams.data.data.map((stream) => {
                return {
                    thumbnailUrl: stream.thumbnail_url,
                    title: stream.title,
                    user: users.data.data.filter((user) => user.id === stream.user_id),
                    game: games.data.data.filter((game) => game.id === stream.game_id),
                    viewersCount: {
                        value: stream.viewer_count
                    },
                    startedAt: stream.started_at,
                    language: stream.language
                };
            }),
            bodyTitle: {
                value: (this.searchText !== null && this.searchText.length > 0) ? 'Results' : 'Popular'
            }
        });
    };

    /**
     * Clears this.handleSearchTimeoutHandler so the request isn't sent anymore.
     * Updates this.searchText with the new incoming text.
     * Launches a new timeout to get the streams matching this.searchText
     *
     * @param text
     */
    handleSearch = (text) => {
        this.searchText = text.target.value;

        if (window.location.pathname === '/') {
            clearTimeout(this.handleSearchTimeoutHandler);
            this.handleSearchTimeoutHandler = setTimeout(this.delayedSearch.bind(this), 2000);
        }
    };

    /**
     * Updates this.state.getStreamParams with this.searchText and calls this.getStreams to retrieve them
     */
    delayedSearch = () => {
        let newState = {
            getStreamsParams: {
                params: {
                    first: this.state.getStreamsParams.params.first
                }
            }
        };

        if (this.searchText.length > 0) {
            newState.getStreamsParams.params['user_login'] = this.searchText;
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
                            onSearch={() => this.getStreams(this.state.getStreamsParams)}
                        />
                        <SearchOptions
                            options={this.state.searchOptions}
                        />
                    </header>
                    <div className='App-body'>
                        <div id='App-router-container'>
                            <Switch>
                                <Route
                                    exact path='/'
                                    render={() => <StreamThumbnailsContainer
                                        streams={this.state.streams}
                                        bodyTitle={this.state.bodyTitle.value}
                                    />}
                                />
                                <Route
                                    path='/:userId'
                                    component={StreamPlayer}
                                    onError={this.handleError}
                                />
                            </Switch>
                        </div>

                        <ToastContainer
                            position={toast.POSITION.BOTTOM_CENTER}
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable
                            pauseOnHover
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
