import Layout from 'antd/es/layout';
import React, { useContext, useState } from "react";
import data from '../../session_storage/storage.json'
import { myContext } from '../contexts/globalContext' 
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Typography from "antd/es/typography";
const { Title } = Typography;


function SignIn():JSX.Element {
  console.log(data)
  const { verification, setVerification } = useContext(myContext)
  const onFinish = (values: any) => {
    console.log(values)
    if(data[values.serverIP]){
      setVerification(true)
    } else {
      const newInstance = values.serverIP 
      data[newInstance] = {}
      data.newInstance.test = 'test'
      console.log(data)
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

  const Demo = () => {
    const [ form ] = Form.useForm();

    const onServerInput = (value: string) => {

    }

  }
  
  const test = () => {
    console.log('test')
  }

  // const setContext = () => {
  //   if (verification === false){
  //     setVerfication(true)
  //   }
  // }

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
            // getValueFromEvent={any}
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
            <Button type="primary" htmlType="submit" onClick={test}>
              Sign In
            </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export { SignIn };


