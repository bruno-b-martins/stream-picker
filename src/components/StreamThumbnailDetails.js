import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import './StreamThumbnailDetails.css';

function StreamThumbnailDetails(props) {
    return (
        <div>
            <div className={props.textClassName}>{props.text}</div>

            <div className='StreamThumbnailDetails-container'>

                <div className='StreamThumbnailDetails-detail'>
                    <div className="StreamThumbnailDetails-detail-item">
                        <FontAwesomeIcon icon="user"/> {props.user}
                    </div>
                    <div className="StreamThumbnailDetails-detail-item">
                        <FontAwesomeIcon icon="gamepad"/> {props.game}
                    </div>
                </div>

                <div className='StreamThumbnailDetails-detail'>
                    <div>
                        <FontAwesomeIcon icon='eye'/> {props.viewersCount}
                    </div>
                    <Moment fromNow>{props.startedAt}</Moment>
                </div>

            </div>
        </div>
    );
}

export default StreamThumbnailDetails;
