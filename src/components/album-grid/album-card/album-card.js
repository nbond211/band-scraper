import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './album-card.css';

class AlbumCard extends Component {
  static propTypes = {
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      artist: PropTypes.string,
      embedId: PropTypes.string
  }

  render() {
    const {imageUrl, title, artist} = this.props;

    return (
      <div className="uk-card uk-card-default uk-card-hover album-card">
            <div className="uk-card-media-top">
                <img src={imageUrl} alt={title}/>
            </div>
            <div className="uk-card-body card-body">
                <h3 className="uk-card-title album-title">{title}</h3>
                <p className="album-artist">{artist}</p>
            </div>
        </div>
    );
  }
}

export default AlbumCard;
