import React, {Component} from 'react';
import './genre-menu.css';
import genreData from '../../genres';

const genres = Object.keys(genreData);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'rock'
        };
    }

    render() {
        const mainGenres = genres.map(genre => {
            return (
                <span key={genre}>{genre}</span>
            );
        });

        const subGenres = genreData[this.state.selected].genres.map(genre => {
            return (
                <span key={genre.tag}>{genre.name}</span>
            );
        });

        return (
            <div className="genre-menu-container">
                <div className="main-genre-menu">{mainGenres}</div>
                <div className="sub-genre-menu">{subGenres}</div>
            </div>
        );
    }
}

export default App;