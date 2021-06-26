import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { Routers } from '../index';

it('Router check the view is need Auth', () => {
  const wrapper = shallow(<Routers />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    if (routeProps.component) {
      pathMap[routeProps.path] = routeProps.component;
    } else if (routeProps.render) {
      pathMap[routeProps.path] = routeProps.render({}).type;
    }
    return pathMap;
  }, {});

  // 若有包含Redirect，表示該頁面需要有權限
  expect(pathMap['/login'].toString()).not.toContain('Redirect');
  expect(pathMap['/profile'].toString()).toContain('Redirect');
});
