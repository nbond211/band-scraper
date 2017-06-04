import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './album-grid.css';
import AlbumCard from './album-card';

class AlbumGrid extends Component {
  static propTypes = {
      albums: PropTypes.array,
      setEmbed: PropTypes.func
  }

  render() {
    const {albums, setEmbed} = this.props;
    const albumCards = albums.map(album => {
        return (
            <div key={album.title} className="uk-width-1-6@xl uk-width-1-5@l uk-width-1-4@m uk-width-1-3@s">
                <AlbumCard
                    title={album.title}
                    artist={album.artist}
                    imageUrl={album.imageUrl}
                    embedId={album.embedId}
                    setEmbed={setEmbed}
                />
            </div>
        );
    });

    return (
      <div className="album-grid uk-grid">
        {albumCards}
      </div>
    );
  }
}

export default AlbumGrid;
