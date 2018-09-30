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
            defaultParams: {
                params: {
                    first: 12
                }
            },
            streams: []
        };
    }

    getStreams(params) {
        console.log(1);
        TwitchAPI.get('/streams', params)
            .then(this.onGetStreams)
            .catch(this.handleError);
    }

    onGetStreams(res) {
        console.log(2);
        this.setState({
            streams: res.data.data
        });
    }

    handleError(err) {
        console.error(err);
    }

    handleSearch(text) {
        console.log(text.target.value);
        TwitchAPI.get('games/top')
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    renderStreamThumbnail(i) {
        return (
            <StreamThumbnail
                title={'stream_thumbnail_' + i}
                src={{
                    type: 'channel',
                    id: 'rocketleague',
                    options: {
                        autoplay: false,
                        mute: true
                    }
                }}
                width={400}
                allowFullScreen={false}
            />
        );
    }

    render() {
        this.getStreams(this.state.defaultParams);
        console.log('yolo', this.state.streams);

        return (
            <div className="App">
                <header className="App-header">
                    <SearchBar
                        onChange={this.handleSearch}
                    />
                </header>
                <div className="App-body">
                    <div className="App-stream-thumbnails-container">
                        {this.renderStreamThumbnail(0)}
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
