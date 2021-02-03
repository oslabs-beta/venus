import React, { useContext, useState } from "react";
// import data from '../../session_storage/storage.json'
import { globalContext } from '../contexts/globalContext' 
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Typography from "antd/es/typography";
import authApi from '../other-modules/authApi';

const { Title } = Typography;


function SignIn():JSX.Element {
  const { verification, setVerification, setServerAddress, } = useContext(globalContext)
  
  /**
   * Deconstruct Form values (serverAddress, secret) 
   * invoke authApi.login (POST request), passing in serverAddress and secret 
   * as key:values in the 'body' object
   * Upon receiving a request, if status is 200 -> authentication was successful
   * Store accessToken in locakStorage, serverAddress in state and 
   * set verification boolean to true
   */
   const onFinish = async (values: any) => {
    const { serverAddress, secret } = values;
    const res = await authApi.login({ serverAddress, secret });
    if (res.status === 200) {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setServerAddress(values.serverAddress)
      setVerification(true)
    }
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
    <div className="loginContainer">
      <Card 
        style={{height: 'fit-content', width: 600, textAlign: 'center'}}
        bordered={true}
        title={<Title>VENUS</Title>}
        hoverable={true}
        >
        <Form
          {...layout}
          name="Login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Server Address"
            name="serverIP"
            rules={[{ required: true, message: 'Please enter valid Server Address.' }]}
          >
            <Input placeholder="Enter Server Address"/>
          </Form.Item>
          <Form.Item
            label="Secret"
            name="secret"
            rules={[{ required: true, message: 'Please enter valid Secret.' }]}
          >
            <Input.Password placeholder="Enter Secret" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export { SignIn };


