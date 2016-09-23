import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { regZip } from '../utils/regex';
import { arrowNoop as noop } from '../utils/noop';
import { SearchForm } from './';

export default class SearchView extends Component {
  get wrapperClasses() {
    return classNames('view search-view', {
      'search-view--as-header': this.props.isHeaderMode,
      'search-view--header-search': this.props.isSearchMode
    });
  }

  render() {
    return (
      <section className={this.wrapperClasses}>
        <div className="search-view__inner">
          <div className="search-view__logo-wrapper">
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <span aria-hidden="true" className="search-view__logo-z">z</span>
            <h1 className="search-view__logo-text">{this.props.logoText}</h1>
          </div>
          <SearchForm
            onSubmit={this.props.onSubmit}
            {...this.props.form}
          />
        </div>
      </section>
    );
  }
}

SearchView.propTypes = {
  // static
  logoText: PropTypes.string,
  form: PropTypes.object,

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
