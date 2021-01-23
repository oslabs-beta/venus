  import Layout from 'antd/es/layout';
const { Header, Footer, Sider, Content } = Layout;
import React, { useContext, useState } from "react";
import { myContext } from '../contexts/globalContext' 
import { Redirect } from "react-router-dom";
import { MainDisplay } from '../containers/MainDisplay'
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Typography from "antd/es/typography";
const { Title } = Typography

export default function SignIn():JSX.Element {
  
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

  const { verification, setVerfication } = useContext(myContext)

  const setContext = () => {
    if (verification === false){
      setVerfication(true)
    }
  }
  //RETURN <MainDisplay/> WHEN SERVER ADDRESS AND SECRET ARE BOTH CORRECT
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
          name="basic"
          initialValues={{ remember: true }}
          style={{alignContent: 'center'}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Server Address"
            name="serverIP"
            rules={[{ required: true, message: 'Please enter valid Server Address.' }]}
          >
            <Input placeholder="Enter Address"/>
          </Form.Item>
          <Form.Item
            label="Secret"
            name="secret"
            rules={[{ required: true, message: 'Please enter valid Secret.' }]}
          >
            <Input.Password placeholder="Enter Secret" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={setContext}>
              Submit
            </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export { SignIn }


