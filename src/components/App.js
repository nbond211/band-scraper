import React, { Component } from 'react';
import GenreMenu from './genre-menu';
import genreData from '../genres';
import fetchAlbumData from '../util/fetch-album-data';
import AlbumGrid from './album-grid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const rock = 'rock';
    this.state = {
      mainGenre: rock,
      subGenre: rock,
      embed: fetchAlbumData(rock)[0].embedId
    }
  }

  setMainGenre = mainGenre => {
    const subGenre = genreData[mainGenre].genres[0].tag;
    this.setState({mainGenre, subGenre});
  }

  setSubGenre = subGenre => {
    this.setState({subGenre});
  }

  setEmbed = embed => {
    this.setState({embed});
  }

  render() {
    const {mainGenre, subGenre, embed} = this.state;
    const albums = fetchAlbumData(subGenre);

    return (
      <div className="uk-container-large container">
        <GenreMenu
          mainGenre={mainGenre}
          subGenre={subGenre}
          setMainGenre={this.setMainGenre}
          setSubGenre={this.setSubGenre}
          genreData={genreData}
          embed={embed}
        />
        <AlbumGrid setEmbed={this.setEmbed} albums={albums}/>
      </div>
    );
  }
}

export default App;
