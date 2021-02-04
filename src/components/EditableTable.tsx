/**
 * @name EditableTable
 * @desc Child of ServiceSettingsContainer, allows users to set persistent thresholds   
**/

import React, { useState, useContext } from 'react';
import { Table, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { dynamicContext } from '../contexts/dynamicContext';


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const { services, serviceThresholds, setServiceThresholds} = useContext(dynamicContext)
  const originData:any[] = [];
  if (serviceThresholds.length > 0) {
    for (let i = 0; i < serviceThresholds.length; i++) {
      originData.push(serviceThresholds[i])
    }
  } else {
   for (let i = 0; i < services.length; i++) {
    
    originData.push({
      key: i,
      service: services[i].service,
      availability_threshold: 99,
      response_time_threshold: 1000,
      load_threshold: 1000,
      error_threshold: 1 
    });
  }
}
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: any) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      sorter: {
        compare: (a:any, b:any) => a.service.length - b.service.length,
      }
    },
    {
      title: "Availability (%)",
      dataIndex: "availability_threshold",
      key: "availability",
      editable: true,
      sorter: {
        compare: (a:any, b:any) => a.availability - b.availability,
      }
    },
    {
      title: "Response Time (ms)",
      dataIndex: "response_time_threshold",
      key: "response_time",
      editable: true,
      sorter: {
        compare: (a:any, b:any) => a.response_time - b.response_time,
      }
    },
    {
      title: "Load (hpm)",
      dataIndex: "load_threshold",
      key: "load",
      editable: true,
    },
    {
      title: "Response Error (%)",
      dataIndex: "error_threshold",
      key: "error",
      editable: true,
    },
    {
      title: 'Set Thresholds',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  setServiceThresholds(data)
  return (
    <Form form={form} component={false} >
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        style={{width: '100%'}}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{y: "67vh"}}
      />
    </Form>
  );
};

export { EditableTable }