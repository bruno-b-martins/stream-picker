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
            <div className='StreamThumbnailsContainer'>
                {thumbnails}
            </div>
        );
    }
}

export default StreamThumbnailsContainer;
