import React  from 'react';
import Link from 'react-router-dom/es/Link';
import './VerticalStreamThumbnail.css';
import VerticalStreamThumbnailDetails from "./VerticalStreamThumbnailDetails";

function VerticalStreamThumbnail(props) {
    return (
        <div className='VerticalStreamThumbnail-container'>
            <Link to={{
                pathname: '/' + (props.stream.user.length > 0 ? props.stream.user[0].id : ''),
                state: { stream: props.stream }
            }}>
                <img
                    src={props.stream.thumbnailUrl.replace('{width}', 300).replace('{height}', 169)}
                    alt={props.stream.title}
                />
            </Link>

            <VerticalStreamThumbnailDetails
                text={props.stream.title}
                textClassName={'VerticalStreamThumbnailDetails-title'}
                user={props.stream.user.length > 0 ? props.stream.user[0].display_name : 'NA'}
                game={props.stream.game.length > 0 ? props.stream.game[0].name : 'NA'}
                viewersCount={props.stream.viewersCount.value || 'NA'}
                startedAt={props.stream.startedAt}
            />
        </div>
    );
}

export default VerticalStreamThumbnail;
