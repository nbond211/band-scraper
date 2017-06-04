import React, { Component } from 'react';
import GenreMenu from './genre-menu';
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
    this.setState({mainGenre});
  }

  setSubGenre = subGenre => {
    this.setState({subGenre});
  }

  render() {
    const {mainGenre, subGenre} = this.state;

    return (
      <div className="uk-container">
        <GenreMenu
          mainGenre={mainGenre}
          subGenre={subGenre}
          setMainGenre={this.setMainGenre}
          setSubGenre={this.setSubGenre}
        />
      </div>
    );
  }
}

export default App;
