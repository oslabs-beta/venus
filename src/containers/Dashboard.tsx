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
import Form from 'antd/es/form';
import Select from 'antd/es/select';
import { dynamicContext } from '../contexts/dynamicContext';
import Title from 'antd/es/typography/Title';


function  Dashboard(): JSX.Element{

   const { services, setServices, aggregate, setAggregate } = useContext(dynamicContext)
 

  const dataSource: any = [];
  useEffect( () => {
    setServices([
      {
        service: 'curriculum-api.codesmith.io',
        status: 'good',
        load: '0.6666666865348816 hpm',
        response_time: 1266,
        error: 50,
        availability: 100
      },
      {
        service: 'finance.yahoo.com',
        status: 'good',
        load: '0.6666666865348816 hpm',
        response_time: 1417.5,
        error: 50,
        availability: 100
      },
      {
        service: 'weather.google.com',
        status: 'good',
        load: '0.6666666865348816 hpm',
        response_time: 1150,
        error: 0,
        availability: 50
      }
    ])
    setAggregate({
      error: 40,
      response_time: 1278,
      load: '2hpm',
      availability: 83,
      status: 'good'
    })
    }, [])
  
 
  
  for (let i = 0; i < services.length; i++) {
    services[i].key = i;
    dataSource.push(services[i])
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
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: () => (
    
        <Form>
          <Form.Item initialValue="all">
            <Select className="apiMethod" placeholder= "ALL METHODS" style={{ width: 140 }}>
              <Select.Option value="all">All METHODS</Select.Option>
              <Select.Option value="get">GET</Select.Option>
              <Select.Option value="post">POST</Select.Option>
              <Select.Option value="put">PUT</Select.Option>
              <Select.Option value="delete">DELETE</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      
      ),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
    },
    {
      title: 'Response Time',
      dataIndex: 'response_time',
      key: 'response_time',
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
        <AggregateStats error={aggregate.error} response_time={aggregate.response_time} load={aggregate.load} availability={aggregate.availability} />
        <Divider><Title level={3}>Current Status</Title></Divider>
        <Table columns={columns} dataSource={dataSource} pagination={false} style={{width: "100%"}} />
      </div>
  )
 };

 export { Dashboard };
 // exports to MainContainer
 