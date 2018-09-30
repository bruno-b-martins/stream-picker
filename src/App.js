import React, { Component } from 'react';
import './assets/FontAwesome.js';
import './App.css';
import TwitchAPI from './services/TwitchAPI';
import SearchBar from './components/SearchBar';
import StreamThumbnail from './components/StreamThumbnail';

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

    getStreams(params) {
        const streamsPromise = TwitchAPI.get('/streams', params);
        const usersPromise = streamsPromise.then((res) => {
            const userIds = res.data.data.map((stream) => stream.user_id);

            return TwitchAPI.get('/users', { params: {
                id: userIds
            }});
        });

        return Promise.all([streamsPromise, usersPromise])
            .then(this.onGetStreams)
            .catch(this.handleError);
    }

    onGetStreams = ([streams, users]) => {
        this.setState({
            streams: streams.data.data.map((stream) => {
                return {
                    title: stream.title,
                    type: 'channel',
                    id: users.data.data
                        .filter((user) => user.id === stream.user_id)
                        .map((user) => user.login)[0]
                };
            })
        });
    };

    handleError(err) {
        console.error(err);
    }

    handleSearch(text) {
        console.log('search', text.target.value);
        TwitchAPI.get('games/top')
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    renderStreamThumbnail(index, title, type, streamId, width) {
        return (
            <StreamThumbnail
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
            return this.renderStreamThumbnail(index, stream.title, stream.type, stream.id, width);
        });

        return (
            <div className="App">
                <header className="App-header">
                    <SearchBar
                        onChange={this.handleSearch}
                    />
                </header>
                <div className="App-body">
                    <div className="App-stream-thumbnails-container">
                        {streams}
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
