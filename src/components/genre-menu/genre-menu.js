import React, {Component} from 'react';
import './genre-menu.css';
import genreData from '../../genres';
import AlbumEmbed from './album-embed';
import ScrollMenu from './scroll-menu';

const genres = Object.keys(genreData);
const mainGenres = genres.map(genre => {
    const name = genreData[genre].genres[0].name.replace('all ', '');
    const tag = genre;
    return {
        name,
        tag
    };
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'rock'
        };
    }

    render() {
        const {selected} = this.state;
        const selectedData = genreData[selected];

        const subGenres = selectedData.genres;
        const mainColor = selectedData.colors[0];
        const subColor = selectedData.colors[1];

        return (
            <div className="genre-menu-container uk-grid">
                <div className="uk-width-expand no-padding-right">
                    <div className="title-container">
                        <h1>
                            <span>Band Scraper</span>
                        </h1>
                    </div>
                    <div className="menu-bar-container">
                        <ScrollMenu color={mainColor} options={mainGenres}/>
                    </div>
                    <div className="menu-bar-container">
                        <ScrollMenu color={subColor} options={subGenres}/>
                    </div>
                </div>
                <div className="uk-width-auto">
                    <AlbumEmbed/>
                </div>

            </div>
        );
    }
}

export default App;