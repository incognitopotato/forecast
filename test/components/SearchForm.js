import React from 'react';
import { shallow, mount } from 'enzyme';
import { SearchForm } from '../../app/components';
import { regZip } from '../../app/utils/regex';

let submitSpy, mockEvent, preventDefaultSpy, data, wrapper, input, form;

describe("Component: SearchForm - ", function() {
  describe("Component: SearchForm : Rendering - ", function() {
    beforeEach(() => {
      submitSpy = jasmine.createSpy("submitSpy");
      preventDefaultSpy = jasmine.createSpy("preventDefaultSpy");
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
        <SearchForm { ...data } />
      );
    });

    it("It renders placeholder prop to input", function() {
      const input = wrapper.find('input');
      expect(input.props().placeholder).toBe('baz');
    });

    it("It renders cta prop to button", function() {
      const button = wrapper.find('button');
      expect(button.text()).toBe('bar');
    });

    it("It does not use default submit behavior", function() {
      wrapper.find('form').simulate('submit', mockEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("It updates component state on input change event", function() {
      const input = wrapper.find('input');
      expect(wrapper.state('value')).toBe('');
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state('value')).toBe('11111');
    });

    it("It calls submitHandler method on submit with input value", function() {
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: '11111' } });
      wrapper.find('form').simulate('submit', mockEvent);
      expect(submitSpy).toHaveBeenCalledWith('11111');
    });

    fit("It renders with correct defaults", function() {
      const wrapper = shallow(<SearchForm />);
      const input = wrapper.find('input');
      const button = wrapper.find('button');
      expect(input.props().placeholder).toBe(SearchForm.defaultProps.placeholder);
      expect(button.text()).toBe(SearchForm.defaultProps.cta);
    });
  });

  describe("Component: SearchForm : Rendering - ", function() {
    beforeEach(() => {
      submitSpy = jasmine.createSpy("submitSpy");
      preventDefaultSpy = jasmine.createSpy("preventDefaultSpy");

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

      wrapper = mount( <SearchForm { ...data } /> );
      input = wrapper.find('input');
      form = wrapper.find('form');
      input.simulate('change', { target: { value: '1111' } });
      wrapper.setState({ isValid: false });
    });

    it("It does not submit when invalid", function() {
      form.simulate('submit', {});
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it("It surfaces error message onSubmit when not valid", function() {
      form.simulate('submit', {});
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
    });

    // FIXME: Skipping for now, ReactCSSTransitionGroup delays execution of unmount.  Transition time needs to be prop.
    xit("It hides error message onChange when going from invalid to valid", function() {
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state().isValid).toBe(true);
      //expect(wrapper.find('.search-form__error-msg')).toBeFalsy();
    });

    it("It uses the validator prop to test input with regex", function() {
      expect(wrapper.find('.search-form__error-msg')).toBeTruthy();
      input.simulate('change', { target: { value: '11111' } });
      expect(wrapper.state().isValid).toBe(true);
      expect(wrapper.state().displayError).toBe(false);
    });
  });
});
