import React, { Component } from 'react';
import './StreamThumbnailsContainer.css';
import StreamThumbnail from './StreamThumbnail';

class StreamThumbnailsContainer extends Component {
    thumbnailWidth = 300;

    renderStreamThumbnail(index, stream, width) {
        return (
            <StreamThumbnail
                key={'stream_thumbnail_' + index}
                stream={stream}
                width={width}
            />
        );
    }

    render() {
        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderStreamThumbnail(index, stream, this.thumbnailWidth);
        });

        return (
            <div className='StreamThumbnailsContainer'>
                {thumbnails}
            </div>
        );
    }
}

export default StreamThumbnailsContainer;
