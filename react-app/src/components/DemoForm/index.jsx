import React from 'react';
import './style.css';
import {
  Form, Input, Button, Checkbox,
} from 'antd';

const Com = (props) => {
  const [state, setState] = React.useState({
    username: 'init',
    password: '',
  });

  return (
    <>
      <Form
        initialValues={state}
        onFinish={(values) => {
          setState(values);
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <hr />
      <p className="text-indigo-200 bg-yellow-600">{ state.username }</p>
      <p className="text-indigo-200 bg-yellow-600">{ state.password }</p>
    </>
  );
};

export default Com;
