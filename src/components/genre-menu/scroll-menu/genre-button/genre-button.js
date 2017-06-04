import React, {Component, PropTypes} from 'react';
import './genre-button.css';

class GenreButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        name: PropTypes.string,
        tag: PropTypes.string
    }
    render() {
        const {name} = this.props;

        return (
            <span className="genre-button">{name}</span>
        );
    }
}

export default GenreButton;
