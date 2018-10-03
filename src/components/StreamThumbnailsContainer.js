import React, { Component } from 'react';
import './StreamThumbnailsContainer.css';
import StreamThumbnail from './StreamThumbnail';

class StreamThumbnailsContainer extends Component {
    renderStreamThumbnail(index, stream) {
        return (
            <StreamThumbnail
                key={'stream_thumbnail_' + index}
                stream={stream}
            />
        );
    }

    render() {
        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderStreamThumbnail(index, stream);
        });

        return (
            <div>
                <div className='StreamThumbnailsContainer-title'>
                    {this.props.bodyTitle}
                </div>
                <div className='StreamThumbnailsContainer-container'>
                    {thumbnails}
                </div>
            </div>
        );
    }
}

export default StreamThumbnailsContainer;
