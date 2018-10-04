import React  from 'react';
import Link from 'react-router-dom/es/Link';
import './HorizontalStreamThumbnail.css';
import HorizontalStreamThumbnailDetails from "./HorizontalStreamThumbnailDetails";

function HorizontalStreamThumbnail(props) {
    return (
        <div className='HorizontalStreamThumbnail-container'>
            <Link to={{
                pathname: '/' + (props.stream.user.length > 0 ? props.stream.user[0].id : ''),
                state: { stream: props.stream }
            }}>
                <img
                    src={props.stream.thumbnailUrl.replace('{width}', 200).replace('{height}', 112)}
                    alt={props.stream.title}
                />
            </Link>

            <HorizontalStreamThumbnailDetails
                text={props.stream.title}
                user={props.stream.user.length > 0 ? props.stream.user[0].display_name : 'NA'}
                viewersCount={props.stream.viewersCount.value || 'NA'}
                startedAt={props.stream.startedAt}
            />
        </div>
    );
}

export default HorizontalStreamThumbnail;
