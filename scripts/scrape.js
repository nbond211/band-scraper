import rp from 'request-promise';
import cheerio from 'cheerio';
import bluebird from 'bluebird';
import jsonfile from 'jsonfile';
import retry from 'async-retry';
import genreData from '../src/data/genres';
import eachSeries from 'async/eachSeries';

function options(uri) {
    return {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
}

function removePaidAlbums(data) {
    return data.filter(item => {
        return typeof item === 'object' && item !== null;
    });
}

async function getAllFreeAlbumsForTag(tag) {
    const urls = await getAllUrlsForTag(tag);
    const count = urls.length;
    const albums = await bluebird.map(urls, (url, index) => {
        console.log(`getting info for album ${index} of ${count} | Tag: ${tag}`);
        return getInfoIfFree(url);
    }, {concurrency: 10});
    return removePaidAlbums(albums);
}

async function getInfoIfFree(url) {
    try {
        return await retry(async bail => {
            const $ = await rp(options(url));
            if ($('.buyItemNyp').text().indexOf('name your price') != -1 || $('.download-link').text().indexOf('Free Download') != -1) {
                return {
                    title: $('h2.trackTitle')
                        .text()
                        .replace('\n            ', '')
                        .replace('\n            \n        ', ''),
                    artist: $($($('div#name-section')).find('a')[0]).text(),
                    imageUrl: $($('a.popupImage').find('img')[0]).attr('src'),
                    embedId: $('meta[property="og:video"]')
                        .attr('content')
                        .replace("https://bandcamp.com/EmbeddedPlayer/v=2/album=", "")
                        .replace("/size=large/tracklist=false/artwork=small/", "")
                }
            } else {
                return 'nope';
            }
        }, {retries: 500});
    } catch (e) {
    }
}

async function getAllUrlsOnPage(tag, page) {
    try {
        return await retry(async bail => {
            const $ = await rp(options(`https://bandcamp.com/tag/${tag}?page=${page}`));
            const items = $('.item');
            const result = [];
            for (let i = 0; i < items.length; i++) {
                result.push($($(items[i]).find('a')[0]).attr('href'));
            }
            return result;
        }, {retries: 500});
    } catch (e) {}
}

async function getAllUrlsForTag(tag) {
    const pages = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];
    const result = await Promise.all(pages.map(page => {
        return getAllUrlsOnPage(tag, page);
    }));
    const flatten = (acc, cur) => {
        return acc.concat(cur);
    };
    return result.reduce(flatten, []);
}

export default async function scrape() {
    const keys = Object.keys(genreData);
    let genres = keys
        .map(key => {
        return genreData[key].genres;
    })
        .reduce((acc, cur) => {
            return acc.concat(cur);
        }, [])
        .map(genre => genre.tag);
    genres = Array.from(new Set(genres));

    eachSeries(genres, async (genre, callback) => {
        const data = await getAllFreeAlbumsForTag(genre);
        await jsonfile.writeFileSync(`./src/data/${genre}.json`, data, {spaces: 2});
        callback();
    }, err => console.log('finished'));
}