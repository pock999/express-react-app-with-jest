import React from 'react';
import renderer from 'react-test-renderer';

import From from '../index';


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
it('renders correctly', () => {
  const tree = renderer
    .create(<From />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});