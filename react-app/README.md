- 2021/06/16

`jest.config.js`

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
}
```



- 2021/06/06 jest + enzyme(use antd)

snapshot: `react-test-renderer`

- - -

`src/setupTests.js`

```
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // 看react 版本
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
```

`package.json` => **棄用**，請改用`2021/06/16`的方法

```
// ...略
"jest": {
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupTests.js"
}
```

`babel.config.json`

```
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-react-jsx"]
}

// 所以要安裝 @babel/preset-react 、 @babel/preset-env 、 @babel/plugin-transform-react-jsx
```

`測試程式 xxx.test.js`

```
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