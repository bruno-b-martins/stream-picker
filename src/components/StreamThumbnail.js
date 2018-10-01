import React  from 'react';
import Link from 'react-router-dom/es/Link';
import './StreamThumbnail.css';

function StreamThumbnail(props) {
    return (
        <Link to={{
            pathname: '/' + props.stream.userId,
            state: { stream: props.stream }
        }}>
            <div>
                <img
                    src={props.stream.thumbnailUrl.replace('{width}', props.width.toFixed(0)).replace('{height}', (0.5625 * props.width).toFixed(0))}
                    alt={props.stream.title}
                />
            </div>
        </Link>
    );
}

export default StreamThumbnail;
