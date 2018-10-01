import React, { Component }  from 'react';
import TwitchAPI from "../services/TwitchAPI";
import './StreamPlayer.css';

class StreamPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.userId,
            stream: props.location.state.stream,
            player: {}
        };

        this.getStream(props.match.params.userId);
    }

    getStream(userId) {
        TwitchAPI.get('/users', { params: {
            id: userId
        }}).then(this.onGetStream)
    }

    onGetStream = (res) => {
        const width = document.getElementsByClassName('App-stream-thumbnails-container').item(0);

        this.setState({
            userId: this.state.userId,
            stream: this.state.stream,
            player: {
                src: "https://player.twitch.tv/?channel=" + res.data.data[0].login,
                height: (0.5625 * width).toFixed(0),
                width: width,
                allowFullscreen: true
            }
        })
    };

    render () {
        return (
            <iframe
                title={this.state.stream.title}
                src={this.state.player.src}
                height={this.state.player.height}
                width={this.state.player.width}
                frameBorder="0"
                scrolling="no"
                allowFullScreen={this.state.player.allowFullScreen}>
            </iframe>
        );
    }
}

export default StreamPlayer;
