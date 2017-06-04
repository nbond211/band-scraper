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
      <div className="uk-card uk-card-default uk-card-hover">
            <div className="uk-card-media-top">
                <img src={imageUrl} alt={title}/>
            </div>
            <div className="uk-card-body">
                <h3 className="uk-card-title">{title}</h3>
                <p>{artist}</p>
            </div>
        </div>
    );
  }
}

export default AlbumCard;
