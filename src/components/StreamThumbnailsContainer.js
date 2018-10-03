import React, { Component } from 'react';
import './StreamThumbnailsContainer.css';
import StreamThumbnailVertical from './StreamThumbnailVertical';

class StreamThumbnailsContainer extends Component {
    renderStreamThumbnailVertical(index, stream) {
        return (
            <StreamThumbnailVertical
                key={'stream_thumbnail_' + index}
                stream={stream}
            />
        );
    }

    render() {
        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderStreamThumbnailVertical(index, stream);
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
