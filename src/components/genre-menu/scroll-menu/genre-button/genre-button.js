import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './genre-button.css';

class GenreButton extends Component {
    static propTypes = {
        setGenre: PropTypes.func,
        name: PropTypes.string,
        tag: PropTypes.string,
        selected: PropTypes.bool,
        setSubGenreButtons: PropTypes.func
    }

    handleClick = () => {
        const {setGenre, tag, setSubGenreButtons} = this.props;
        setGenre(tag);
        if (setSubGenreButtons) {
            setTimeout(setSubGenreButtons, 0);
        }
    }

    render() {
        const {name, selected} = this.props;
        const style = selected ? {backgroundColor: '#000'} : undefined;

        return (
            <span className="genre-button" onClick={this.handleClick} style={style}>{name}</span>
        );
    }
}

export default GenreButton;
