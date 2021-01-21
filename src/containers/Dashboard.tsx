/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

 import React, {useContext, useEffect} from 'react';
//  import TabContainer from './TabContainer'
import { AggregateStats } from '../components/AggregateStats';
import { initialState, myContext, AppState } from '../contexts/globalContext';
import Divider from 'antd/es/divider';
import Table from 'antd/es/table';
import Tag  from 'antd/es/tag';
import { dynamicContext } from '../contexts/dynamicContext';


function  Dashboard(): JSX.Element{

    const expandedRowRender: any = () => {
      
      const subColumns = [
        { 
          title: 'Path', 
          dataIndex: 'path', 
          key: 'path' },
        { 
          title: 'Method', 
          dataIndex: 'method', 
          key: 'method' 
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: () => (
          <Tag color={'orange'} key={'test'}>FAIR</Tag> 
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
          path: '/WEATHER',
          method: 'GET',
          status: 'good',
          uptime: '98%',      
          latency: '300ms',
          load: '1000hpm',
          error: '2%'
        }
      ];
      return <Table columns={subColumns} dataSource={subDataSource} pagination={false} />
    }
  
  const dataSource: any = [];
  const source: any = [ 
    {
      service: 'Google Weather API',
      status: 'good',
      uptime: '98%',      
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Surfline API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Stripe API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Surfline API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Unemployment API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'AWS API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Codesmith API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Plaid API',
      status: 'good',
      uptime: "98%",
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
      // sorter: {
      //   compare: (a:any, b:any) => a.title.length - b.title.length,
      //   multiple: 1,
      // }
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
  

    return(
      <div id="dashboard">          
        <AggregateStats />
        <Divider></Divider>
        <Table columns={columns} dataSource={dataSource} pagination={false} expandable={{expandedRowRender}} style={{width: "100%"}} />
      </div>
  )
 };

 export { Dashboard };
 // exports to MainContainer
