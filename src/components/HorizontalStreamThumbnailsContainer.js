import React, { Component } from 'react';
import './HorizontalStreamThumbnailsContainer.css';
import HorizontalStreamThumbnail from './HorizontalStreamThumbnail';

class HorizontalStreamThumbnailsContainer extends Component {
    renderHorizontalStreamThumbnail(index, stream) {
        return (
            <HorizontalStreamThumbnail
                key={'stream_thumbnail_' + index}
                stream={stream}
            />
        );
    }

    render() {
        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderHorizontalStreamThumbnail(index, stream);
        });

        return (
            <div className='HorizontalStreamThumbnailsContainer-container'>
                <div className='HorizontalStreamThumbnailsContainer-title'>
                    {this.props.bodyTitle}
                </div>
                <div className='HorizontalStreamThumbnailsContainer-thumbnails'>
                    {thumbnails}
                </div>
            </div>
        );
    }
}

export default HorizontalStreamThumbnailsContainer;
