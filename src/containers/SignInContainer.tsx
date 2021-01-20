import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';


function SignIn():JSX.Element {
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
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
      </Form>
  
  )
}
