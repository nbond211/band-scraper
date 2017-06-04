import React, { Component } from 'react';
import './album-embed.css';
import PropTypes from 'prop-types';

class AlbumEmbed extends Component {
  static propTypes = {
    embedId: PropTypes.string
  }

  render() {
    const {embedId} = this.props;

    return (
      <iframe 
        title="album player"
        style={{border: '0', width: '200px', height: '200px'}} 
        src={`https://bandcamp.com/EmbeddedPlayer/album=${embedId}/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/`} 
        seamless
        >
      </iframe>
    );
  }
}

export default AlbumEmbed;