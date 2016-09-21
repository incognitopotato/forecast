import React, { Component, PropTypes } from 'react';
import { isClient } from '../utils/env';
import { renderWithDefault } from '../utils/renderingHelpers';
import { arrowNoop as noop } from '../utils/noop';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: ''
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const { value } = this.state;
    this.props.onSubmit(value);
  }

  render() {
    return (
      <form className="search-form" ref="wrapper" onSubmit={ this.handleSubmit }>
        <input className="search-form__input"
          type="text"
          ref="input"
          onChange={ this.onChange }
          placeholder={ this.props.placeholder }
        />
        <button className="search-form__button" type="submit" ref="button">
          { this.props.cta }
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  cta: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  cta: 'Submit',
  placeholder: 'default text',
  onSubmit: noop
};
