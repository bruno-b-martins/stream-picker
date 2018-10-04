import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import './HorizontalStreamThumbnailDetails.css';

function HorizontalStreamThumbnailDetails(props) {
    return (
        <div className='HorizontalStreamThumbnailDetails-container'>
            <div className='HorizontalStreamThumbnailDetails-title'>{props.text}</div>

            <div className='HorizontalStreamThumbnailDetails-detail'>
                <FontAwesomeIcon icon="user"/> {props.user}
            </div>

            <div className='HorizontalStreamThumbnailDetails-detail'>
                <FontAwesomeIcon icon='eye'/> {props.viewersCount}
            </div>

            <Moment fromNow>{props.startedAt}</Moment>
        </div>
    );
}

export default HorizontalStreamThumbnailDetails;
