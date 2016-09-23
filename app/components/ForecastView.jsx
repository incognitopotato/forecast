import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { days } from '../utils/constants';
import { WeatherItem } from './';

export default class ForecastView extends Component {
  constructor(props) {
    super(props);
    this.renderWeatherItem = this.renderWeatherItem.bind(this);
  }

  get wrapperClasses() {
    return classNames('view forecast-view', {});
  }

  renderWeatherItem(listItem, i) {
    let day;
    let isLarge;
    let date;

    if (i === 0) {
      day = `Today in ${this.props.city.name}`;
      isLarge = true;
    } else if (i === 1) {
      day = 'Tomorrow';
      isLarge = false;
    } else {
      date = new Date();
      day = days[(date.getDay() + i) % 7];
      isLarge = false;
    }

    const props = {
      key: i,
      isLarge,
      day,
      temp: listItem.temp.day,
      description: listItem.weather[0].description
    };

    return (<WeatherItem {...props} />);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <section className="view forecast-view">
        <ReactCSSTransitionGroup
          component="div"
          className="forecast-view__inner"
          transitionName={{
            enter: 'forecast-view__item--enter',
            enterActive: 'forecast-view__item--enter-active',
            leave: 'forecast-view__item--leave',
            leaveActive: 'forecast-view__item--leave-active'
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          { this.props.forecast.map(this.renderWeatherItem) }
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

ForecastView.propTypes = {
  forecast: PropTypes.array,
  city: PropTypes.object,
  show: PropTypes.bool
};

ForecastView.defaultProps = {
  forecast: [],
  city: {},
  show: false
};
