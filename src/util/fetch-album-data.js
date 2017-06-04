export default function fetchAlbumData(tag) {
    const data = require(`../data/${tag}.json`);
    return data;
}