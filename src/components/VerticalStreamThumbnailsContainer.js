import React, { Component } from 'react';
import { ScaleLoader } from "react-spinners";
import './VerticalStreamThumbnailsContainer.css';
import VerticalStreamThumbnail from './VerticalStreamThumbnail';

class VerticalStreamThumbnailsContainer extends Component {
    renderVerticalStreamThumbnail(index, stream) {
        return (
            <VerticalStreamThumbnail
                key={'stream_thumbnail_' + index}
                stream={stream}
            />
        );
    }

    render() {
        const thumbnails = this.props.streams.map((stream, index) => {
            return this.renderVerticalStreamThumbnail(index, stream);
        });

        return (
            <div>
                <div className='VerticalStreamThumbnailsContainer-title'>
                    {this.props.bodyTitle}
                </div>

                <ScaleLoader
                    className='VerticalStreamThumbnailsContainer-loading'
                    sizeUnit={"px"}
                    size={100}
                    color={'#4682b4'}
                    loading={this.props.loading}
                />

                <div className='VerticalStreamThumbnailsContainer-container'>
                    {thumbnails}
                </div>
            </div>
        );
    }
}

export default VerticalStreamThumbnailsContainer;
