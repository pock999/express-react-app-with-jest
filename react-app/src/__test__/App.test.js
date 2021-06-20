import React, { PureComponent } from 'react';

import { mount, ReactWrapper, render } from 'enzyme';

import App from 'App';

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });
});

describe('App', () => {
  describe('Form in App', () => {
    it('Input username init', async () => {
      const wrapper = mount(<App/>);
      expect(wrapper.find('#username').hostNodes().getDOMNode().value).toBe('init');
    });
  
    it('Input password init', async () => {
      const wrapper = mount(<App/>);
      expect(wrapper.find('#password').hostNodes().getDOMNode().value).toBe('');
    });
  
    it('Input username change', async () => {
      const wrapper = mount(<App/>);
      wrapper.find('#username').hostNodes().simulate('change', {target: {value: "spam"}});
      expect(wrapper.find('#username').hostNodes().getDOMNode().value).toBe('spam');
    });
  });
});