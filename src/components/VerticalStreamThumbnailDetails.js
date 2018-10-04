import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import './VerticalStreamThumbnailDetails.css';

function VerticalStreamThumbnailDetails(props) {
    return (
        <div>
            <div className={props.textClassName}>{props.text}</div>

            <div className='VerticalStreamThumbnailDetails-container'>

                <div className='VerticalStreamThumbnailDetails-detail'>
                    <div className='VerticalStreamThumbnailDetails-detail-item'>
                        <FontAwesomeIcon icon='user'/> {props.user}
                    </div>
                    <div className='VerticalStreamThumbnailDetails-detail-item'>
                        <FontAwesomeIcon icon='gamepad'/> {props.game}
                    </div>
                </div>

                <div className='VerticalStreamThumbnailDetails-detail'>
                    <div>
                        <FontAwesomeIcon icon='eye'/> {props.viewersCount}
                    </div>
                    <Moment fromNow>{props.startedAt}</Moment>
                </div>

            </div>
        </div>
    );
}

export default VerticalStreamThumbnailDetails;
