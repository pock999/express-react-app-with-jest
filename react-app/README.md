- 2021/06/26

    - /src/router/__test__/Routers.test.js
		```jsx
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

			// 若有包含Redirect，表示該頁面需要有權限
			expect(pathMap['/login'].toString()).not.toContain('Redirect');
			expect(pathMap['/profile'].toString()).toContain('Redirect');
		});
		```

		- /src/router/index.js
		```jsx
		/* eslint-disable react/jsx-filename-extension */
		import React from 'react';
		import {
			matchPath, Switch, Route, Redirect,
			Router,
		} from 'react-router-dom';

		import { history } from 'packages';
		import AuthService from './AuthService';
		import routes from './routes';

		const Routers = (props) => (
			<Router history={history}>
				<Switch>
					{routes && routes.map((route) => (
						<Route
							path={route.path}
							exact={route.exact || false}
							key={route.path}
							// 這裡面render
							render={(props) => {
								const { allow, failPath } = AuthService.validateRoute(route);
								if (allow) return (<route.component {...props} routes={route.routes} />);

								return <Redirect to={failPath} />;
							}}
						/>
					))}
				</Switch>
			</Router>
		);

		export { Routers };
		```

		- /src/router/routes/index.js
		```jsx
		/* eslint-disable react/jsx-filename-extension */
		import React from 'react';
		import history from 'packages/@history';
		import Loadable from 'react-loadable';

		const routes = [
			{
				component: () => {
					const Page = Loadable({
						loader: () => import('views/Home'),
						// loading: Loading,
						loading: () => (<>...載入中</>),
					});
					return (
						<Page />
					);
				},
				path: '/',
				exact: true,
				permissions: null,
			},
		...
		];
		```

		- /src/router/AuthService.js

		```jsx
		const service = {
			/**
			 * return { allow, failPath }
			*/
			validateRoute(route) {
				// TODO: check

				// TODO: check route.permissions isNull => yes all alow

				// TODO: get localStorage token

				// TODO: no have token => logout(clear localStorage)
				// TODO: have token => token-login ( fail => logout(clear localStorage) )

				// TODO: check route and permissions

				// TODO: 暫時為了測試用
				if (route.path === '/profile') {
					return {
						allow: false,
						failPath: '/login',
					};
				}

				return {
					allow: true,
					failPath: null,
				};
			},
		};

		export default service;
		```

- 2021/06/20
    - jsconfig.json ⇒ 使import可以直接使用絕對路徑(從src起算)

		```json
		{
			"compilerOptions": {
				"baseUrl": "src/"
			},
			"include": ["src"]
		}
		```

		- .env

		```json
		NODE_PATH=src/
		```

		- jest.config.json ⇒ 使jest測試時可以直接使用絕對路徑(從src起算)，也可以讀懂組件內import的東西

		```json
		{
			// ...略
			moduleDirectories: ['node_modules', 'src']
		}
		```

		- eslintrc.js(常使用airbnb標準)

		```jsx
		module.exports = {
			// ...略
			rules: {
				'no-await-in-loop': 'warn',
				'react/jsx-no-target-blank': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/require-default-props': 'warn',
				'react/no-unescaped-entities': 'warn',
				'react/jsx-props-no-spreading': 'warn',
				'react/forbid-prop-types': 'warn',
				'react/button-has-type': 'off',
				'jsx-a11y/control-has-associated-label': 'warn',
				'react/jsx-wrap-multilines': 'warn',
				'react/jsx-boolean-value': 'warn',
				'import/prefer-default-export': 'off',
				'import/no-unresolved': 'warn',
				'no-unused-vars': 'warn',
				// props 檢查
				'react/prop-types': 'warn',
				// 解構 props
				'react/destructuring-assignment': 'warn',
				'no-shadow': 'warn',
			},
			// 使airbnb檢查語法時也能認出import的路徑
			settings: {
				'import/resolver': {
					node: {
						extensions: ['.js', '.jsx', '.ts', '.tsx'],
						moduleDirectory: ['node_modules', 'src/'],
					},
				},
			},
		};
		```

- 2021/06/17

[參考](https://medium.com/enjoy-life-enjoy-coding/jest-mock-連-style-都管得著-沒錯-就是管得著-24285728d627)

  - React component 要測試

	```jsx
	import './style.css';

	// ...略
	```

	- 安裝 `identity-obj-proxy`

	```
	yarn add identity-obj-proxy -D
	```

	- jest.config.js

	```jsx
	module.exports = {
			// ...略
			moduleNameMapper: {
				"\\.(css|scss|sass|less)$": "identity-obj-proxy" // 把css相關檔案對應至這個identity-obj-proxy
			},
	};
	```

	- 更新snapshot

	```bash
	jest -u
	```

- 2021/06/16

`jest.config.js`

```jsx
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
}
```



- 2021/06/06 jest + enzyme(use antd)

snapshot: `react-test-renderer`

- - -

`src/setupTests.js`

```jsx
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // 看react 版本
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
```

`package.json` => **棄用**，請改用`2021/06/16`的方法

```json
// ...略
"jest": {
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupTests.js"
}
```

`babel.config.json`

```json
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-react-jsx"]
}

// 所以要安裝 @babel/preset-react 、 @babel/preset-env 、 @babel/plugin-transform-react-jsx
```

`測試程式 xxx.test.js`

```jsx
// ... 其他略

// 當出現TypeError: window.matchMedia is not a function
// 就需要加上
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
```