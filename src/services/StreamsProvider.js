import TwitchAPI from './TwitchAPI';

const getEnrichedStreams = (params) => {
    const streamsPromise = TwitchAPI.get('/streams', params);

    const usersPromise = streamsPromise.then((res) => {
        const usersIds = res.data.data.map((stream) => stream.user_id);

        return TwitchAPI.get('/users', { params: {
                id: usersIds
            }});
    });

    const gamesPromise = streamsPromise.then((res) => {
        const gamesIds = res.data.data.map((stream) => stream.game_id);

        return TwitchAPI.get('/games', { params: {
                id: gamesIds
            }});
    });

    return Promise.all([streamsPromise, usersPromise, gamesPromise])
        .then(onGetEnrichedStreams);
};

const onGetEnrichedStreams = ([streams, users, games]) => {
    return streams.data.data.map((stream) => {
        return {
            thumbnailUrl: stream.thumbnail_url,
            title: stream.title,
            user: users.data.data.filter((user) => user.id === stream.user_id),
            game: games.data.data.filter((game) => game.id === stream.game_id),
            viewersCount: {
                value: stream.viewer_count
            },
            startedAt: stream.started_at,
            language: stream.language
        };
    });
};

export const StreamsProvider = {
    getEnrichedStreams: getEnrichedStreams,
    onGetEnrichedStreams: onGetEnrichedStreams
};