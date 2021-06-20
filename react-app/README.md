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