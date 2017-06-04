import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './scroll-menu.css'
import GenreButton from './genre-button';

class ScrollMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayLeft: false,
            displayRight: true
        };
    }

    static propTypes = {
        options: PropTypes.array,
        color: PropTypes.string,
        setGenre: PropTypes.func,
        selected: PropTypes.string,
        onRef: PropTypes.func,
        setSubGenreButtons: PropTypes.func
    }

    componentDidMount() {
        const {onRef} = this.props;
        if (onRef) {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        const {onRef} = this.props;
        if (onRef) {
            this.props.onRef(undefined);
        }
    }

    setButtonVisibility = () => {
        const scrollWidth = this.buttonsContainer.scrollWidth - this.buttonsContainer.clientWidth;
        const scrollLeft = Math.ceil(this.buttonsContainer.scrollLeft);

        const displayLeft = scrollLeft > 0;
        const displayRight = scrollLeft < scrollWidth;
        this.setState({displayLeft, displayRight});
    }

    clickRight = () => {
        $(this.buttonsContainer).animate( { scrollLeft: '+=500' }, 500);
        setTimeout(this.setButtonVisibility, 500);
    }

    clickLeft = () => {
        $(this.buttonsContainer).animate( { scrollLeft: '-=500' }, 500);
        setTimeout(this.setButtonVisibility, 500);
    }

    render() {
        const {displayLeft, displayRight} = this.state;
        const {options, setGenre, selected, setSubGenreButtons} = this.props;

        const buttons = options.map(option => {
            return (
                <GenreButton 
                    key={option.tag}
                    tag={option.tag}
                    name={option.name}
                    setGenre={setGenre}
                    selected={selected === option.tag}
                    setSubGenreButtons={setSubGenreButtons}
                />
            );
        });

        return (
            <div className="scroll-menu" style={{backgroundColor: this.props.color}}>
                <div 
                    className="left-icon-container"
                    style={{visibility: displayLeft ? 'visible' : 'hidden'}}
                >
                    <span onClick={this.clickLeft} className="icon" data-uk-icon="icon: chevron-left"/>
                </div>
                <div 
                className="buttons-container"
                ref={(div) => { this.buttonsContainer = div; }}
                >
                    {buttons}
                </div>
                <div 
                    className="right-icon-container"
                    style={{visibility: displayRight ? 'visible' : 'hidden'}}
                >
                    <span onClick={this.clickRight} className="icon" data-uk-icon="icon: chevron-right"/>
                </div>
            </div>
        );
    }
}

export default ScrollMenu;