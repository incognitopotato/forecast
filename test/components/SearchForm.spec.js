import React from 'react';
import { shallow, mount } from 'enzyme';
import { SearchForm } from '../../app/components';
import { regZip } from '../../app/utils/regex';

let submitSpy;
let mockEvent;
let preventDefaultSpy;
let data;
let wrapper;
let input;
let form;
let button;

describe('Component: SearchForm - ', () => {
  describe('Component: SearchForm : Rendering - ', () => {
    beforeEach(() => {
      submitSpy = jasmine.createSpy('submitSpy');
      preventDefaultSpy = jasmine.createSpy('preventDefaultSpy');
      mockEvent = {
        preventDefault: preventDefaultSpy,
        target: {
          value: 'foo'
        }
      };
      data = {
        cta: 'bar',
        placeholder: 'baz',
        onSubmit: submitSpy,
        validator: regZip
      };
      wrapper = mount(
        <SearchForm {...data} />
      );
    });

    it('It renders placeholder prop to input', () => {
      input = wrapper.find('input');
      expect(input.props().placeholder).toBe('baz');
    });

    it('It renders cta prop to button', () => {
      button = wrapper.find('button');
      expect(button.text()).toBe('bar');
    });

    it('It does not use default submit behavior', () => {
      wrapper.find('form').simulate('submit', mockEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('It updates component state on input change event', () => {
      input = wrapper.find('input');
      expect(wrapper.state('value')).toBe('');
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state('value')).toBe('11111');
    });

    it('It calls submitHandler method on submit with input value', () => {
      input = wrapper.find('input');
      input.simulate('change', { target: { value: '11111' } });
      wrapper.find('form').simulate('submit', mockEvent);
      expect(submitSpy).toHaveBeenCalledWith('11111');
    });

    it('It renders with correct defaults', () => {
      wrapper = shallow(<SearchForm />);
      input = wrapper.find('input');
      button = wrapper.find('button');
      expect(input.props().placeholder).toBe(SearchForm.defaultProps.placeholder);
      expect(button.text()).toBe(SearchForm.defaultProps.cta);
    });
  });

  describe('Component: SearchForm : Rendering - ', () => {
    beforeEach(() => {
      submitSpy = jasmine.createSpy('submitSpy');
      preventDefaultSpy = jasmine.createSpy('preventDefaultSpy');

      mockEvent = {
        preventDefault: preventDefaultSpy,
        target: {
          value: 'foo'
        }
      };

      data = {
        cta: 'bar',
        placeholder: 'baz',
        onSubmit: submitSpy,
        validator: regZip
      };

      wrapper = mount(<SearchForm {...data} />);
      input = wrapper.find('input');
      form = wrapper.find('form');
      input.simulate('change', { target: { value: '1111' } });
      wrapper.setState({ isValid: false });
    });

    it('It does not submit when invalid', () => {
      form.simulate('submit', {});
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('It surfaces error message onSubmit when not valid', () => {
      form.simulate('submit', {});
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
    });

    // FIXME: Skipping for now, ReactCSSTransitionGroup delays execution of unmount.
    xit('It hides error message onChange when going from invalid to valid', () => {
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state().isValid).toBe(true);
      // expect(wrapper.find('.search-form__error-msg')).toBeFalsy();
    });

    it('It uses the validator prop to test input with regex', () => {
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state().isValid).toBe(true);
      expect(wrapper.state().displayError).toBe(false);
    });
  });
});
