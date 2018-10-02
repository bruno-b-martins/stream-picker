import React, { Component } from 'react';
import './StreamThumbnailsContainer.css';
import StreamThumbnail from './StreamThumbnail';

class StreamThumbnailsContainer extends Component {
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
        console.log('render', this.props.streams);
        const container = document.getElementsByClassName('StreamThumbnailsContainer').item(0);
        let width = 0;
        if (container) {
            if (this.props.streams.length >= 3) {
                width = 0.3 * container.offsetWidth;
            } else if (this.props.streams.length === 2) {
                width = 0.45 * container.offsetWidth;
            } else {
                width = container.offsetWidth;
            }
        }

        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderStreamThumbnail(index, stream, width);
        });

        return (
            <div className='StreamThumbnailsContainer'>
                {thumbnails}
            </div>
        );
    }
}

export default StreamThumbnailsContainer;
