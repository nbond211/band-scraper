import rp from 'request-promise';
import cheerio from 'cheerio';
import bluebird from 'bluebird';
import jsonfile from 'jsonfile';
import retry from 'async-retry';
import genreData from '../src/genres';
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

async function getAllFreeAlbumsForTag(tag, log) {
    const urls = await getAllUrlsForTag(tag);
    const count = urls.length;
    const albums = await bluebird.map(urls, (url, index) => {
        console.log(`getting info for album ${index} of ${count} | Tag: ${tag}`);
        if (log && log[url]) {
            return log[url];
        } else {
            return getInfoIfFree(url, log);
        }
    }, {concurrency: 10});
    const data = removePaidAlbums(albums);
    return {data, log: log ? log : newLog};
}

async function getInfoIfFree(url, log) {
    console.log('making request');
    try {
        return await retry(async bail => {
            const $ = await rp(options(url));
            if ($('.buyItemNyp').text().indexOf('name your price') != -1 || $('.download-link').text().indexOf('Free Download') != -1) {
                const data = {
                    url,
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
                log[url] = data;
                return data;
            } else {
                const paid = 'paid';
                log[url] = paid;
                return paid;
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
        let oldLog;
        try {
            oldLog = require(`../src/logs/${genre}`);
        } catch (ex) {
            oldLog = {};
        }
        const {log, data} = await getAllFreeAlbumsForTag(genre, oldLog);
        await jsonfile.writeFileSync(`./src/logs/${genre}.json`, log, {spaces: 2});
        await jsonfile.writeFileSync(`./src/data/${genre}.json`, data, {spaces: 2});
        callback();
    }, err => console.log('finished'));
}