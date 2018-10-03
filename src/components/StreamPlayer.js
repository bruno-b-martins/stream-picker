import React, { Component } from 'react';
import TwitchAPI from '../services/TwitchAPI';
import { StreamsProvider } from '../services/StreamsProvider';
import StreamThumbnailDetails from "./StreamThumbnailDetails";
import './StreamPlayer.css';

class StreamPlayer extends Component {
    constructor(props) {
        super(props);

        this.timeoutHandler = null;

        this.state = {
            user: {
                id: props.match.params.userId
            },
            stream: props.location.state.stream,
            player: {},
            viewersCount: {
                value: null
            },
            gameStreams: []
        };

        this.getStream(props.match.params.userId);
        this.getGameStreams({ params: {
            game_id: props.location.state.stream.game[0].id,
            first: 10
        }});
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
        const width = document.getElementById('App-router-container').offsetWidth - 400;

        this.setState({
            user: res.data.data[0],
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
            user_id: this.state.user.id
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
            viewersCount: {
                value: res.data.data[0].viewer_count
            }
        });

        this.timeoutHandler = setTimeout(this.getViewersCount, 10000);
    };

    getGameStreams = (params) => {
        StreamsProvider.getEnrichedStreams(params)
            .then(this.onGetGameStreams)
            .catch(this.props.onError);
    };

    onGetGameStreams = (streams) => {
        this.setState({
            gameStreams: streams
        });
    };

    /**
     * On resize update the stream player's size
     */
    onResize = () => {
        const containerWidth = document.getElementById('App-router-container').offsetWidth;
        const width = containerWidth - 400 < 400 ? containerWidth : containerWidth - 400;

        this.setState({
            player: {
                src: this.state.player.src,
                height: (0.5625 * width).toFixed(0),
                width: width,
                allowFullScreen: this.state.player.allowFullScreen
            }
        });
    };

    render () {
        return (
            <div className='StreamPlayer-container'>
                <div className='StreamPlayer-title'>{this.state.stream.title}</div>

                <div className='StreamPlayer-stream-and-thumbnails-container'>
                    <div className='StreamPlayer-stream'>
                        <iframe
                            title={this.state.stream.title}
                            src={this.state.player.src}
                            height={this.state.player.height}
                            width={this.state.player.width}
                            frameBorder='0'
                            scrolling='no'
                            allowFullScreen={this.state.player.allowFullScreen}>
                        </iframe>

                        <StreamThumbnailDetails
                            text={this.state.user.description}
                            textClassName={'StreamThumbnailDetails-description'}
                            user={this.state.user !== null && this.state.user !== undefined ? this.state.user.display_name : 'NA'}
                            game={this.state.stream.game.length > 0 ? this.state.stream.game[0].name : 'NA'}
                            viewersCount={this.state.viewersCount.value || 'NA'}
                            startedAt={this.state.stream.startedAt}
                        />
                    </div>

                    <div className='StreamPlayer-thumbnails'>

                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandler);
    }
}

export default StreamPlayer;
