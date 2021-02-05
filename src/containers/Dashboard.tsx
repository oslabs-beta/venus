/**
 * @name Dashboard
 * @desc Current Status page that immediately renders when user signs in. Parent container to aggregate stats
 */

import { io } from "socket.io-client";
import React, { useContext, useEffect } from "react";
import { AggregateStats } from "../components/AggregateStats";
import Divider from "antd/es/divider";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import { FormDropDown } from '../components/FormDropDown';
import { globalContext } from "../contexts/globalContext"
import { dynamicContext } from "../contexts/dynamicContext";
import Title from "antd/es/typography/Title";


function Dashboard(): JSX.Element {
  
  //imported dynamic context services for conditional rendering of real time data. 
  const { services, setServices, aggregate, setAggregate, filter, setFilter, serviceThresholds, serviceNames, setServiceNames } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)
  const dataSource: any = [];
  const list: string[] = [];
  useEffect(() => {
    setFilter(filter)
    const socket:any = io(serverAddress + ':8080', {
      transports: ["websocket"],
    });
    console.log('in console')
    socket.on("connection", () => {
      console.log(socket.id);
      console.log('connected')
    });
    console.log('past connection req')
    socket.on("real-time-object", (output: any) => {
      const newData = JSON.parse(output[0]);
      
      setAggregate(newData.aggregate);
      setServices(newData.services);
      const dependencyGraph = JSON.parse(output[1])
      console.log('in dashboard with dependency graph context', dependencyGraph)
    });
    return () => socket.disconnect();
    
  }, []);
  
  if (serviceThresholds.length > 0){
      for (let i = 0; i < services.length; i++){
      let status = 0
      if (filter[services[i].service]){
        console.log(filter)
        
        const holder = filter[services[i].service]
        if (serviceThresholds[i].load_threshold < services[i].byMethod[holder].load) ++status
        if (serviceThresholds[i].error_threshold < services[i].byMethod[holder].error) ++status
        if (serviceThresholds[i].response_time_threshold < services[i].byMethod[holder].response_time) ++status
        if (serviceThresholds[i].availability_threshold > services[i].byMethod[holder].availability) ++status
        services[i].byMethod[holder].status = status
        services[i].byMethod[holder].byMethod = Object.keys(services[i].byMethod)
        console.log(services[i].byMethod[holder])
        dataSource.push(services[i].byMethod[holder]); 
      } else {
        console.log(serviceThresholds, services[i])
        if (serviceThresholds[i].load_threshold < services[i].load) ++status
        if (serviceThresholds[i].error_threshold < services[i].error) ++status
        if (serviceThresholds[i].response_time_threshold < services[i].response_time) ++status
        if (serviceThresholds[i].availability_threshold > services[i].availability) ++status
        services[i].status = status
        dataSource.push(services[i]);
      }
    }
  } else {
    for (let i = 0; i < services.length; i++) {
      const baseline: any = {
        availability_threshold: 99,
        response_time_threshold: 1000,
        load_threshold: 1000,
        error_threshold: 1
      }
      services[i].key = i;
      let status = 0;
      list.push(services[i].service)
      if (filter[services[i].service]){
        const holder = filter[services[i].service]
        if (baseline.load_threshold < services[i].byMethod[holder].load) ++status
        if (baseline.error_threshold < services[i].byMethod[holder].error) ++status
        if (baseline.response_time_threshold < services[i].byMethod[holder].response_time) ++status
        if (baseline.availability_threshold > services[i].byMethod[holder].availability) ++status
        services[i].byMethod[holder].status = status
        services[i].byMethod[holder].byMethod = Object.keys(services[i].byMethod)
        dataSource.push(services[i].byMethod[holder]);
      } else {
        if (baseline.load_threshold < services[i].load) ++status
        if (baseline.error_threshold < services[i].error) ++status
        if (baseline.response_time_threshold < services[i].response_time) ++status
        if (baseline.availability_threshold > services[i].availability) ++status
        services[i].status = status
        dataSource.push(services[i]);
      }
    }
    if (serviceNames.length < list.length)
      setServiceNames(list)
    }
    
  const columns: any = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      sorter: {
        compare: (a:any, b:any) => a.error - b.error,
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        if (status === 0) {
          return <Tag color={"green"}  style={{fontWeight: 'bold'}}>GOOD</Tag>;
        }
        if (status === 1) {
          return <Tag color={"orange"} style={{fontWeight: 'bold'}}>FAIR</Tag>;
        }
        if (status >= 2) {
          return <Tag color={"red"}  style={{fontWeight: 'bold'}}>POOR</Tag>;
        }
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (text:string, record:any,) => (<FormDropDown record={record} />),
    },
    {
      title: "Availability (%)",
      dataIndex: "availability",
      key: "availability",
      sorter:{
        compare: (a:any, b:any) => a.availability - b.availability,
      }

    },
    {
      title: "Response Time (ms)",
      dataIndex: "response_time",
      key: "response_time",
      sorter:{
        compare: (a:any, b:any) => a.response_time - b.response_time,
      }
    },
    {
      title: "Load (hpm)",
      dataIndex: "load",
      key: "load",
      sorter:{
        compare: (a:any, b:any) => a.load - b.load,
      }
    },
    {
      title: "Response Error (%)",
      dataIndex: "error",
      key: "error",
      sorter:{
        compare: (a:any, b:any) => a.error - b.error,
      }
    },
  ];

  return (
    <div id="dashboard">
      <AggregateStats
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
      />

      <Table
        bordered
        scroll={{y: "67vh"}}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export { Dashboard };
