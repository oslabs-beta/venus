/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data and Chart Container.
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

// ec2-3-15-29-241.us-east-2.compute.amazonaws.com:8080
function Dashboard(): JSX.Element {
  
  const { services, setServices, aggregate, setAggregate, filter, setFilter, serviceThresholds, firstTime, setFirstTime } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)

  const dataSource: any = [];
  useEffect(() => {
    setFilter(filter)
    const accessToken = localStorage.getItem('accessToken');
    const socket:any = io(serverAddress + ':8080', {
      transports: ["websocket"],
      query: { accessToken },
    });
    socket.on("connection", () => {
      console.log('Desktop connected to client!');
    });
    socket.on("real-time-object", (output: any) => {
      console.log(output)
      const newData = JSON.parse(output[0]);
      setAggregate(newData.aggregate);
      setServices(newData.services);
    });
    // setServices([
    //   {
    //     service: "a",
    //     load: 1,
    //     response_time: 1,
    //     error: 1,
    //     availability: 1,
    //     byMethod: {
    //       GET: {
    //         service: "a",
    //         load: 99,
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    //   {
    //     service: "b",
    //     load: 0,
    //     response_time: 1000,
    //     error: 0,
    //     availability: 100,
    //     byMethod: {
    //       GET: {
    //         service:"b",
    //         load: 2,
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    //   {
    //     service: "c",
    //     load: 101,
    //     response_time: 1266,
    //     error: 5,
    //     availability: 152,
    //     byMethod: {
    //       GET: {
    //         status: "bad",
    //         load: "0.6666666865348816 hpm",
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    //   {
    //     service: "d",
    //     load: 101,
    //     response_time: 1266,
    //     error: 5,
    //     availability: 152,
    //     byMethod: {
    //       GET: {
    //         status: "bad",
    //         load: "0.6666666865348816 hpm",
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    //   {
    //     service: "e",
    //     load: 101,
    //     response_time: 1266,
    //     error: 5,
    //     availability: 152,
    //     byMethod: {
    //       GET: {
    //         status: "bad",
    //         load: "0.6666666865348816 hpm",
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    //   {
    //     service: "f",
    //     load: 101,
    //     response_time: 1266,
    //     error: 5,
    //     availability: 152,
    //     byMethod: {
    //       GET: {
    //         status: "bad",
    //         load: "0.6666666865348816 hpm",
    //         response_time: 12,
    //         error: 5,
    //         availability: 1,
    //       }
    //     }
    //   },
    // ]);
    // setAggregate({
    //   error: 40,
    //   response_time: 1278,
    //   load: 2,
    //   availability: 83,
    //   status: 'good'
    // })
    return () => socket.disconnect();
    
  }, []);


  if (serviceThresholds.length > 0){

      for (let i = 0; i < services.length; i++){
      let status = 0
      if (filter[services[i].service]){
        const holder = filter[services[i].service]
        if (serviceThresholds[i].load_threshold < services[i].byMethod[holder].load) ++status
        if (serviceThresholds[i].error_threshold < services[i].byMethod[holder].error) ++status
        if (serviceThresholds[i].response_time_threshold < services[i].byMethod[holder].response_time) ++status
        if (serviceThresholds[i].availability_threshold > services[i].byMethod[holder].availability) ++status
        services[i].byMethod[holder].status = status
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
      if (filter[services[i].service]){
        const holder = filter[services[i].service]
        if (baseline.load_threshold < services[i].byMethod[holder].load) ++status
        if (baseline.error_threshold < services[i].byMethod[holder].error) ++status
        if (baseline.response_time_threshold < services[i].byMethod[holder].response_time) ++status
        if (baseline.availability_threshold > services[i].byMethod[holder].availability) ++status
        services[i].byMethod[holder].status = status
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
  }
 
  const columns: any = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      sorter: (a:any, b:any) => a.service.length - b.service.length
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
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      sorter:{
        compare: (a:any, b:any) => a.availability - b.availability,
      }

    },
    {
      title: "Response Time",
      dataIndex: "response_time",
      key: "response_time",
      sorter:{
        compare: (a:any, b:any) => a.response_time - b.response_time,
      }
    },
    {
      title: "Load",
      dataIndex: "load",
      key: "load",
      sorter:{
        compare: (a:any, b:any) => a.load - b.load,
      }
    },
    {
      title: "Error",
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
      <Divider>
        <Title level={3}>Current Status</Title>
      </Divider>
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
