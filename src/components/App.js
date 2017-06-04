import React, {Component} from 'react';
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
      embed: fetchAlbumData(rock)[0].embedId,
      mobile: false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

  updateWindowDimensions() {
    const width = window.innerWidth;
    this.setState({mobile: width <= 650});
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const {mainGenre, subGenre, embed, mobile} = this.state;
    const albums = fetchAlbumData(subGenre);

    return (
      <div className="uk-container-large container">
        {!mobile &&
        <div>
            <GenreMenu
              mainGenre={mainGenre}
              subGenre={subGenre}
              setMainGenre={this.setMainGenre}
              setSubGenre={this.setSubGenre}
              genreData={genreData}
              embed={embed}/>
            <AlbumGrid setEmbed={this.setEmbed} albums={albums}/>
          </div>
        }
        {mobile &&
          <div>
            <h1>Band Scraper is intended for use on devices with larger screens.</h1>
          </div>
        }
      </div>
    );
  }
}

export default App;
