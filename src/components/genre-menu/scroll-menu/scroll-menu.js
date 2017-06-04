import React, {Component, PropTypes} from 'react';
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
        onClickOption: PropTypes.func
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
        const {options, onClickOption} = this.props;

        const buttons = options.map(option => {
            return (
                <GenreButton 
                    key={option.tag}
                    tag={option.tag}
                    name={option.name}
                    onClick={onClickOption}
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