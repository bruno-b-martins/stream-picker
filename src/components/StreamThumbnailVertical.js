import React  from 'react';
import Link from 'react-router-dom/es/Link';
import './StreamThumbnailVertical.css';
import StreamThumbnailDetails from "./StreamThumbnailDetails";

function StreamThumbnailVertical(props) {
    return (
        <div className='StreamThumbnailVertical-container'>
            <Link to={{
                pathname: '/' + (props.stream.user.length > 0 ? props.stream.user[0].id : ''),
                state: { stream: props.stream }
            }}>
                <img
                    src={props.stream.thumbnailUrl.replace('{width}', 300).replace('{height}', 169)}
                    alt={props.stream.title}
                />
            </Link>

            <StreamThumbnailDetails
                text={props.stream.title}
                textClassName={'StreamThumbnailDetails-title'}
                user={props.stream.user.length > 0 ? props.stream.user[0].display_name : 'NA'}
                game={props.stream.game.length > 0 ? props.stream.game[0].name : 'NA'}
                viewersCount={props.stream.viewersCount.value || 'NA'}
                startedAt={props.stream.startedAt}
            />
        </div>
    );
}

export default StreamThumbnailVertical;
