import React, { Component }  from 'react';
import TwitchAPI from '../services/TwitchAPI';
import './StreamPlayer.css';

class StreamPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.userId,
            stream: props.location.state.stream,
            player: {},
            viewersCount: null
        };

        this.getStream(props.match.params.userId);
    }

    /**
     * Get the stream for the input userId
     *
     * @param userId
     */
    getStream(userId) {
        TwitchAPI.get('/users', { params: {
            id: userId
        }})
            .then(this.onGetStream)
            .catch(this.props.onError);
    }

    /**
     * Updates this.state with the necessary details to run the stream and triggers the getViewersCount timeout-based loop
     *
     * @param res
     */
    onGetStream = (res) => {
        const width = document.getElementById('App-router-container').offsetWidth;

        this.setState({
            player: {
                src: 'https://player.twitch.tv/?channel=' + res.data.data[0].login + '&allowfullscreen=true',
                height: (0.5625 * width).toFixed(0),
                width: width,
                allowFullScreen: true
            }
        });

        this.getViewersCount();
    };

    /**
     * Gets the updated details of the stream, including the viewer_count
     */
    getViewersCount = () => {
        TwitchAPI.get('/streams', { params: {
            user_id: this.state.userId
        }})
            .then(this.onGetViewersCount)
            .catch(this.props.onError);
    };

    /**
     * Updates this.state with the viewer_count
     *
     * @param res
     */
    onGetViewersCount = (res) => {
        this.setState({
            stream: {
                viewersCount: {
                    value: res.data.data[0].viewer_count
                }
            }
        });

        setTimeout(this.getViewersCount, 10000);    //TODO - set a timeout handler?
    };

    render () {
        return (
            <div>
                <iframe
                    title={this.state.stream.title}
                    src={this.state.player.src}
                    height={this.state.player.height}
                    width={this.state.player.width}
                    frameBorder='0'
                    scrolling='no'
                    allowFullScreen={this.state.player.allowFullScreen}>
                </iframe>

                {this.state.stream.viewersCount.value}
            </div>
        );
    }
}

export default StreamPlayer;
