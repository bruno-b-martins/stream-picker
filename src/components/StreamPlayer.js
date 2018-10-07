import React, { Component } from 'react';
import TwitchAPI from '../services/TwitchAPI';
import { StreamsProvider } from '../services/StreamsProvider';
import VerticalStreamThumbnailDetails from "./VerticalStreamThumbnailDetails";
import HorizontalStreamThumbnailsContainer from "./HorizontalStreamThumbnailsContainer";
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
        const width = getPlayerWidth();
        console.log('onGetStream', width);

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

    /**
     * Gets more streams from the same game being viewed
     *
     * @param params
     */
    getGameStreams = (params) => {
        StreamsProvider.getEnrichedStreams(params)
            .then(this.onGetGameStreams)
            .catch(this.props.onError);
    };

    /**
     * Updates this.state with the incoming streams
     *
     * @param streams
     */
    onGetGameStreams = (streams) => {
        this.setState({
            gameStreams: streams.filter((stream) => stream.user[0].id !== this.state.stream.user[0].id)
        });
    };

    /**
     * On resize update the stream player's size
     */
    onResize = () => {
        const width = getPlayerWidth();

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
                <div className='StreamPlayer-stream-container'>
                    <div className='StreamPlayer-title'>{this.state.stream.title}</div>

                    <iframe
                        title={this.state.stream.title}
                        src={this.state.player.src}
                        height={this.state.player.height}
                        width={this.state.player.width}
                        frameBorder='0'
                        scrolling='no'
                        allowFullScreen={this.state.player.allowFullScreen}>
                    </iframe>

                    <VerticalStreamThumbnailDetails
                        text={this.state.user.description}
                        textClassName={'VerticalStreamThumbnailDetails-description'}
                        user={this.state.user !== null && this.state.user !== undefined ? this.state.user.display_name : 'NA'}
                        game={this.state.stream.game.length > 0 ? this.state.stream.game[0].name : 'NA'}
                        viewersCount={this.state.viewersCount.value || 'NA'}
                        startedAt={this.state.stream.startedAt}
                    />
                </div>

                <HorizontalStreamThumbnailsContainer
                    streams={this.state.gameStreams}
                    bodyTitle={this.state.stream.game.length > 0 ? 'More like ' + this.state.stream.game[0].name : ''}
                />
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

function getPlayerWidth() {
    const containerWidth = document.getElementById('App-router-container').offsetWidth;
    console.log('containerWidth', containerWidth);
    return containerWidth - 400 < 400 ? containerWidth : containerWidth - 400;
}

export default StreamPlayer;
