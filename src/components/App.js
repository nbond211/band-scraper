import React, { Component } from 'react';
import GenreMenu from './genre-menu';
import genreData from '../genres';
import fetchAlbumData from '../util/fetch-album-data';
import AlbumGrid from './album-grid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainGenre: 'rock',
      subGenre: 'rock'
    }
  }

  setMainGenre = mainGenre => {
    const subGenre = genreData[mainGenre].genres[0].tag;
    this.setState({mainGenre, subGenre});
  }

  setSubGenre = subGenre => {
    this.setState({subGenre});
  }

  render() {
    const {mainGenre, subGenre} = this.state;
    const albums = fetchAlbumData(subGenre);

    return (
      <div className="uk-container-large container">
        <GenreMenu
          mainGenre={mainGenre}
          subGenre={subGenre}
          setMainGenre={this.setMainGenre}
          setSubGenre={this.setSubGenre}
          genreData={genreData}
        />
        <AlbumGrid albums={albums}/>
      </div>
    );
  }
}

export default App;
