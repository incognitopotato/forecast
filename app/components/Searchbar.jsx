import React, { Component, PropTypes } from 'react';
import { isClient } from '../utils/env';
import { renderWithDefault } from '../utils/renderingHelpers';
import { arrowNoop as noop } from '../utils/noop';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { value } = e.target;
    this.props.onSubmit(value);
  }

  render() {
    return (
      <form className="searchbar" ref="wrapper" onSubmit={ this.handleSubmit }>
        <input type="text" ref="input" placeholder={ this.props.placeholder } />
        <button type="submit" ref="button">
          { this.props.cta }
        </button>
      </form>
    );
  }
}

Searchbar.propTypes = {
  cta: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func
};

Searchbar.defaultProps = {
  cta: 'Submit',
  placeholder: 'default text',
  onSubmit: noop
};
