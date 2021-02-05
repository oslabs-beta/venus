/**
 * @name SignInContainer
 * @desc Component that renders to the page upon initial load of application for user to sign in
 * 
 */
import React, { useContext, useState } from "react";
import { globalContext } from '../contexts/globalContext' 
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Typography from "antd/es/typography";
import logo from '../logo/venus.png';
const { Title, Text } = Typography;


function SignIn():JSX.Element {
  const { verification, setVerification, setServerAddress, } = useContext(globalContext)
  const onFinish = (values: any) => {
      setServerAddress(values.serverIP)
      setVerification(true)
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
      <img src={logo} alt="logo" className="logo"/>
      <Title>VENUS</Title>
      
      <Card 
        className="signInCard"
        style={{height: 'fit-content', width: 380, boxShadow: "rgba(46, 45, 45, 0.16) 0px 3px 6px, rgba(46, 45, 45, 0.16) 0px 3px 6px"}}
        bordered={true}
        hoverable={true}
        >
        <Form
          {...layout}
          data-testid="Login-form"
          name="Login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{marginTop: 25}}
          >
          <Form.Item
            
            className= "textBox"
            name="serverIP"
            rules={[{ required: true, message: 'Please enter valid Server Address.' }]}
          >
            <Input.Password placeholder="Enter Server Address"/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button className= "textBox" type="primary" htmlType="submit" style={{marginLeft: 15}}>
              Sign In
            </Button>
        </Form.Item>
        </Form>
      </Card>
      <Text style={{marginTop: 10}}>Venus Beta v1.0 2021</Text>
    </div>
  )
}

export { SignIn };


