import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class WeatherItem extends Component {
  constructor(props) {
    super(props);
    this.renderDescriptionOnLarge = this.renderDescriptionOnLarge.bind(this);
  }

  get wrapperClasses() {
    return classNames('weather-item', {
      'weather-item--large': this.props.isLarge
    });
  }

  renderDescriptionOnLarge() {
    if (this.props.isLarge) {
      return (<p className="weather-item__description">{ this.props.description }</p>);
    }

    return null;
  }

  render() {
    return (
      <div className={this.wrapperClasses}>
        <p className="weather-item__day">{ this.props.day }</p>
        <p className="weather-item__temp">{ Math.floor(this.props.temp) } ℉</p>
        { this.renderDescriptionOnLarge() }
      </div>
    );
  }
}

WeatherItem.propTypes = {
  isLarge: PropTypes.bool,
  temp: PropTypes.number,
  day: PropTypes.string,
  description: PropTypes.string
};

WeatherItem.defaultProps = {
  isLarge: false,
  temp: '',
  day: '',
  description: ''
};
