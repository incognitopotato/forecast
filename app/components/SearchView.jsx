import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { isClient } from '../utils/env';
import { renderWithDefault } from '../utils/renderingHelpers';
import { regZip } from '../utils/regex';
import { arrowNoop as noop } from '../utils/noop';
import { SearchForm } from './';

export default class SearchView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="view search-view">
        <div className="search-view__inner">
          <div className="search-view__logo-wrapper">
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <h1 className="search-view__logo-text">{ this.props.logoText }</h1>
          </div>
          <SearchForm
            onSubmit={this.props.onSubmit}
            { ...this.props.form }
          />
        </div>
      </section>
    );
  }
}

SearchView.propTypes = {
  // static
  logoText: PropTypes.string,
  form: PropTypes.shape({
    cta: PropTypes.string,
    placeholder: PropTypes.string,
    validator: PropTypes.instanceOf(RegExp),
    errorMsg: PropTypes.string
  }),

  // redux
  onSubmit: PropTypes.func.isRequired,
  isHeaderMode: PropTypes.bool.isRequired,
  isSearchMode: PropTypes.bool.isRequired
};

SearchView.defaultProps = {
  logoText: 'Snorecast.',
  form: {
    cta: 'zzz',
    placeholder: 'zipcode',
    validator: regZip,
    errorMsg: 'Please enter a valid 5 digit zipcode.'
  },
  onSubmit: noop,
  isHeaderMode: false,
  isSearchMode: false
};
