import React, { Component } from 'react';
import GenreMenu from './genre-menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="uk-container">
        <GenreMenu/>
      </div>
    );
  }
}

export default App;
