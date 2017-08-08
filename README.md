# Band Scraper
<img width="500" alt="band-scraper" src="https://user-images.githubusercontent.com/9114397/29092199-8642fa1a-7c53-11e7-95b6-c0048cf5cd52.png">

## Summary
Band Scraper is a React application that allows users to browse through all music on the music distribution platform, <a href="https://bandcamp.com/">Bandcamp</a> that is completely legally available for free. Some artists on Bandcamp give fans the option to choose their own price for their music and provide no minimum, and Bandcamp does not provide users with a way to filter by price to find this feee music. Band Scraper is a solution to this problem. 

## <a target="_blank" href="http://bandscraper.com/">Deployed App</a>

## Installation
1. `cd` into the `src` directory
2. run `npm install`

## Starting the server
1. `cd` into the `src` directory
2. run `npm start`
3. the application will be running at `localhost:3000`

## Updating the music data (This will take a long time due to Bandcamp's lack of API and request rate limiting)
1. run `npm run scrape`
2. Two directories, `data` and `logs` will be created in the `src` directory with JSON files containing the music data
