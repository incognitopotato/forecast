import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { arrowNoop as noop } from '../utils/noop';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.renderErrorMsg = this.renderErrorMsg.bind(this);
    this.state = {
      value: '',
      isValid: true,
      displayError: false
    };
  }

  onChange(e) {
    const displayingError = this.state.displayError;
    const isValid = this.checkValidation(e.target.value);
    const newState = {
      value: e.target.value,
      isValid
    };

    if (isValid && displayingError) {
      newState.displayError = false;
    }

    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value, isValid } = this.state;

    if (isValid) {
      this.props.onSubmit(value);
    } else {
      this.setState({ displayError: true });
    }
  }

  checkValidation(value) {
    return this.props.validator.test(value);
  }

  renderErrorMsg() {
    if (this.state.displayError) {
      return (<p className="search-form__error-msg">{ this.props.errorMsg }</p>);
    }

    return null;
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="search-form__input"
          type="text"
          onChange={this.onChange}
          placeholder={this.props.placeholder}
        />
        <button className="search-form__button" type="submit">
          { this.props.cta }
        </button>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'search-form__error-msg--enter',
            enterActive: 'search-form__error-msg--enter-active',
            leave: 'search-form__error-msg--leave',
            leaveActive: 'search-form__error-msg--leave-active'
          }}
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          { this.renderErrorMsg() }
        </ReactCSSTransitionGroup>
      </form>
    );
  }
}

SearchForm.propTypes = {
  cta: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  validator: PropTypes.instanceOf(RegExp),
  onSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  cta: 'Submit',
  placeholder: 'default text',
  errorMsg: 'default error',
  validator: null,
  onSubmit: noop
};
