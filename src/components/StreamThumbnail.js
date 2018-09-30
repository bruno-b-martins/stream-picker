import React  from 'react';
import './SearchBar.css';

function StreamThumbnail(props) {
    let src = "https://player.twitch.tv/?" + props.src.type + "=" + props.src.id;
    for (let option in props.src.options) {
        src += "&" + option + "=" + props.src.options[option];
    }

    const height = 0.5625 * props.width;

    return (
        <iframe
            title={props.title}
            src={src}
            height={height}
            width={props.width}
            frameBorder="0"
            scrolling="no"
            allowFullScreen={props.allowFullScreen}>
        </iframe>
    );
}

export default StreamThumbnail;
