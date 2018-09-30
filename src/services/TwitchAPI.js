import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    timeout: 10000,
    headers: { 'Client-ID': 'bvj2dmr1d7qq2xcj2rv0lsm8mbplfa' }
});
