import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Searchbar } from '../../app/components';

describe("Component: Searchbar - ", function() {
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
    wrapper = shallow(
      <Searchbar { ...data } />
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

  it("It calls submitHandler method on submit with input value", function() {
    wrapper.find('form').simulate('submit', mockEvent);
    expect(submitSpy).toHaveBeenCalledWith('foo');
  });
});