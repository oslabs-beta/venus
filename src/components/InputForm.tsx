
import MinusCircleOutlined from '@ant-design/icons/MinusCircleFilled';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Select from 'antd/es/select'
import React, { useContext, useState, useEffect, ContextType } from 'react';

const { Option } = Select;

function InputForm(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.Item name="Base URL" label="URL" rules={[{ required: true, message: 'Missing URL' }]}> 
        <Input name="URL"  ></Input>
      </Form.Item>
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Request"
                      name={[field.name, 'request']}
                      fieldKey={[field.fieldKey, 'request']}
                      rules={[{ required: true, message: 'Missing Request Type' }]}
                    >
                      <Select style={{ width: 130 }}>
                        <Option value="GET">'GET'</Option>
                        <Option value="POST">'POST'</Option>
                        <Option value="PUT">'PUT'</Option>
                        <Option value="DELETE">'DELETE'</Option>
                        <Option value="PATCH">'PATCH'</Option>
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Path"
                  name={[field.name, 'path']}
                  fieldKey={[field.fieldKey, 'path']}
                  rules={[{ required: true, message: 'Missing path' }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Paths
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { InputForm };
