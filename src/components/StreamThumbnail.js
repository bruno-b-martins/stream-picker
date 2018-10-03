import React  from 'react';
import Link from 'react-router-dom/es/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import './StreamThumbnail.css';

function StreamThumbnail(props) {
    return (
        <div className='StreamThumbnail-container'>
            <Link to={{
                pathname: '/' + props.stream.userId,
                state: { stream: props.stream }
            }}>
                <img
                    src={props.stream.thumbnailUrl.replace('{width}', 300).replace('{height}', 169)}
                    alt={props.stream.title}
                />
            </Link>
            <div className='StreamThumbnail-title'>{props.stream.title}</div>

            <div className='StreamThumbnail-details'>
                <div className='StreamThumbnail-detail'>
                    <div>
                        <FontAwesomeIcon icon="user"/> {props.stream.user.length > 0 ? props.stream.user[0].display_name : 'NA'}
                    </div>
                    <div>
                        <FontAwesomeIcon icon="gamepad"/> {props.stream.game.length > 0 ? props.stream.game[0].name : 'NA'}
                    </div>
                </div>

                <div className='StreamThumbnail-detail'>
                    <div>
                        <FontAwesomeIcon icon='eye'/> {props.stream.viewersCount.value || 'NA'}
                    </div>
                    <Moment fromNow>{props.stream.startedAt}</Moment>
                </div>
            </div>
        </div>
    );
}

export default StreamThumbnail;
