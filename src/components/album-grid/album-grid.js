import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './album-grid.css';
import AlbumCard from './album-card';

class AlbumGrid extends Component {
  static propTypes = {
      albums: PropTypes.array
  }

  render() {
    const {albums} = this.props;
    const albumCards = albums.map(album => {
        return (
            <div className="uk-width-1-6">
                <AlbumCard
                    title={album.title}
                    artist={album.artist}
                    imageUrl={album.imageUrl}
                    embedId={album.embedId}
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
