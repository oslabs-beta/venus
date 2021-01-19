  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */

import React from "react";
// import { CardDropDown } from "../components/CardDropDown";
// import { Chart } from "../components/Chart";
import { Table, Badge, Menu, Dropdown, Space, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function onChange( pagination:any, filters:any, sorter:any, extra:any) {
  console.log('params', pagination, filters, sorter, extra);
}


  const expandedRowRender: any = () => {

    const subColumns = [
      { 
        Path: 'Path', 
        dataIndex: 'path', 
        key: 'path' },
      { 
        ReqMethod: 'Request Method', 
        dataIndex: 'request method', 
        key: 'request method' 
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: () => (
        <Tag color={'green'} key={'test'}>GOOD</Tag> 
        ),
      },
      {
        title: 'Uptime',
        dataIndex: 'uptime',
        key: 'uptime',
      },
      {
        title: 'Latency',
        dataIndex: 'latency',
        key: 'latency',
      },
      {
        title: 'Load',
        dataIndex: 'load',
        key: 'load',
      },
      {
        title: 'Error',
        dataIndex: 'error',
        key: 'error',
      },
    ];


    const subDataSource: any = [
      {
        path: '/weather',
        RequestMethod: 'GET',
        status: 'good',
        uptime: '98%',      
        latency: '300ms',
        load: '1000hpm',
        error: '2%'
      }
    ];

    return <Table columns={columns} dataSource={subDataSource} pagination={false} />
  }


const dataSource: any = [];

const source: any = [
  {
    service: 'Google Weather',
    status: 'good',
    uptime: '98%',      
    latency: '300ms',
    load: '1000hpm',
    error: '2%'
  },
  {
    service: 'Google Weather',
    status: 'good',
    uptime: '98%',
    latency: '300ms',
    load: '1000hpm',
    error: '2%'
  },
];

for (let i = 0; i < source.length; i++) {
  source[i].key = i;
  dataSource.push(source[i])
}
const columns: any = [
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: () => (
    <Tag color={'green'} key={'test'}>GOOD</Tag>
      
    ),
  },
  {
    title: 'Uptime',
    dataIndex: 'uptime',
    key: 'uptime',
  },
  {
    title: 'Latency',
    dataIndex: 'latency',
    key: 'latency',
  },
  {
    title: 'Load',
    dataIndex: 'load',
    key: 'load',
  },
  {
    title: 'Error',
    dataIndex: 'error',
    key: 'error',
  },
];


function ChartContainer(): JSX.Element {
  return (
   
    <div id="chartContainer">
      <h1>Chart Container</h1>
      {/* <CardDropDown /> */}
      {/* <Chart /> */}
      <Table columns={columns} dataSource={dataSource} pagination={false} expandable={{expandedRowRender}} />
      
    </div>

// onChange={onChange} >> add for stat level sortability. 
  );
}

export { ChartContainer };
