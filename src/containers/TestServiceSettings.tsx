import React, { useState, useEffect, useContext } from 'react';
import { dynamicContext } from '../contexts/dynamicContext'
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

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
  const inputNode = <InputNumber />;
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
  const originData: any = [];
  const { serviceThresholds, setServiceThresholds } = useContext(dynamicContext)
  for (let i = 0; i < serviceThresholds.length; i++) {
    if (serviceThresholds[i].availability_threshold){
      serviceThresholds[i].key = i
      originData.push(serviceThresholds[i])
    } else {
      originData.push({
        key: i,
        service: serviceThresholds[i].service,
        availability_threshold: 99,
        response_time_threshold: 1500,
        load_threshold: 100,
        error_threshold: 1 
      });
    }
  }
  
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      service: '',
      availability_threshold: 0,
      response_time_threshold: 0,
      load_threshold: 0,
      error_threshold: 0,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key:any) => {
    try{
      const row = await form.validateFields();
      const newData = [...originData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setServiceThresholds(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setServiceThresholds(newData);
        setEditingKey('');
      }
      console.log(serviceThresholds)
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
      title: "Availability Threshold (%)",
      dataIndex: "availability_threshold",
      key: "availability",
      editable: true,
      sorter: {
        compare: (a:any, b:any) => a.availability - b.availability,
        
      }
    },
    {
      title: "Response Time Threshold (ms)",
      dataIndex: "response_time_threshold",
      key: "response_time",
      editable: true,
      sorter: {
        compare: (a:any, b:any) => a.response_time - b.response_time,
      }
    },
    {
      title: "Load Threshold (hpm)",
      dataIndex: "load_threshold",
      key: "load",
      editable: true,
    },
    {
      title: "Response Error Threshold (%)",
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
              // href="javascript:;"
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
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'service' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export { EditableTable };