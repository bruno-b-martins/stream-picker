import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './assets/FontAwesome.js';
import './App.css';
import TwitchAPI from './services/TwitchAPI';
import SearchBar from './components/SearchBar';
import StreamThumbnail from './components/StreamThumbnail';
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

    onPickStream(stream) {
        return TwitchAPI.get('/users', { params: {
            id: stream.userId
        }}).then();
    }

    renderStreamThumbnail(index, stream, width) {
        return (
            <StreamThumbnail
                key={'stream_thumbnail_' + index}
                stream={stream}
                width={width}
                onClick={() => this.onPickStream(stream)}
            />
        );
    }

    renderStreamPlayer(index, title, type, streamId, width) {
        return (
            <StreamPlayer
                key={'stream_thumbnail_' + index}
                title={title}
                src={{
                    type: type,
                    id: streamId,
                    options: {
                        autoplay: false,
                        mute: true
                    }
                }}
                width={width}
                allowFullScreen={false}
            />
        );
    }

    render() {
        const container = document.getElementsByClassName('App-stream-thumbnails-container').item(0);
        let width = 0;
        if (container) {
            if (this.state.streams.length >= 3) {
                width = 0.3 * container.offsetWidth;
            } else if (this.state.streams.length === 2) {
                width = 0.45 * container.offsetWidth;
            } else {
                width = container.offsetWidth;
            }
        }

        const streams = this.state.streams.map((stream, index) => {
            return this.renderStreamThumbnail(index, stream, width);
        });

        return (
            <div className="App">
                <header className="App-header">
                    <SearchBar
                        onChange={this.handleSearch}
                    />
                </header>
                <div className="App-body">
                    <Router>
                        <div className="App-stream-thumbnails-container">
                            {streams}
                            <Route
                                path="/stream/:userId"
                                component={StreamPlayer}
                            />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }

}

export default App;
