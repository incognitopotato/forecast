import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { SearchForm } from '../../app/components';

describe("Component: SearchForm - ", function() {
  let submitSpy, mockEvent, preventDefaultSpy, data, wrapper;

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
      onSubmit: submitSpy
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
    input.simulate('change', { target: { value: 'foo' } });
    expect(wrapper.state('value')).toBe('foo');
  });

  it("It calls submitHandler method on submit with input value", function() {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'foo' } });
    wrapper.find('form').simulate('submit', mockEvent);
    expect(submitSpy).toHaveBeenCalledWith('foo');
  });

  it("It renders with correct defaults", function() {
    wrapper = shallow(<SearchForm />);
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    expect(input.props().placeholder).toBe(SearchForm.defaultProps.placeholder);
    expect(button.text()).toBe(SearchForm.defaultProps.cta);
  });
});
