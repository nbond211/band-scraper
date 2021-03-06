import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './genre-menu.css';
import AlbumEmbed from './album-embed';
import ScrollMenu from './scroll-menu';

class GenreMenu extends Component {
    static propTypes = {
        mainGenre: PropTypes.string,
        subGenre: PropTypes.string,
        setMainGenre: PropTypes.func,
        setSubGenre: PropTypes.func,
        genreData: PropTypes.object,
        embed: PropTypes.string
    }

    constructor(props) {
        super(props);
        const {genreData} = props;

        const genres = Object.keys(genreData);

        this.mainGenres = genres.map(genre => {
            const name = genreData[genre]
                .genres[0]
                .name
                .replace('all ', '');
            const tag = genre;
            return {name, tag};
        });
    }

    setSubGenreButtons = () => {
        this.subGenreMenu.setButtonVisibility();
    }

    render() {
        const {mainGenre, subGenre, setMainGenre, setSubGenre, genreData, embed} = this.props;
        const selectedData = genreData[mainGenre];

        const subGenres = selectedData.genres;
        const mainColor = selectedData.colors[0];
        const subColor = selectedData.colors[1];

        return (
            <div data-uk-sticky className="genre-menu-container uk-grid">
                <div className="uk-width-expand no-padding-right">
                    <div className="title-container">
                        <h1 className="title">
                            <a className="title-link" href="/">Band Scraper</a>
                        </h1>
                    </div>
                    <div className="menu-bar-container">
                        <ScrollMenu
                            setGenre={setMainGenre}
                            selected={mainGenre}
                            color={mainColor}
                            options={this.mainGenres}
                            setSubGenreButtons={this.setSubGenreButtons}
                            />
                    </div>
                    <div className="menu-bar-container">
                        <ScrollMenu
                            setGenre={setSubGenre}
                            selected={subGenre}
                            color={subColor}
                            options={subGenres}
                            onRef={ref => (this.subGenreMenu = ref)}
                            />
                            
                    </div>
                </div>
                <div className="uk-width-auto no-padding-right">
                    <AlbumEmbed embedId={embed}/>
                </div>

            </div>
        );
    }
}

export default GenreMenu;