import React, { useState, useEffect, useContext } from 'react';
import { dynamicContext } from '../contexts/dynamicContext'
import { Table, InputNumber, Popconfirm, Form, Typography } from 'antd';

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
  const { serviceThresholds, setServiceThresholds, services } = useContext(dynamicContext)

  // if (serviceThresholds.length === services.length){
  //   console.log('equal length')
  //   for (let i = 0; i < services.length; i++) {
  //     originData.push({
  //       key: i,
  //       service: services[i].service,
  //       availability_threshold: 99,
  //       response_time_threshold: 1000,
  //       load_threshold: 100,
  //       error_threshold: 1 
  //     });
  //   }
  //   console.log(originData, 'originData')
  // } else {
    console.log('defaults')
    console.log(services, 'services')
    for (let i = 0; i < services.length; i++) {
      originData.push({
        key: i,
        service: services[i].service,
        availability_threshold: 99,
        response_time_threshold: 1000,
        load_threshold: 100,
        error_threshold: 1 
      });
    } 
  // }
  console.log(originData)


// console.log(serviceThresholds, 'editable chart')
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
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
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
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
        // inputType: col.dataIndex === 'service' ? 'number' : 'text',
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