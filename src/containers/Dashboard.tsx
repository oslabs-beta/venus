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
import Form from "antd/es/form";
import Select from "antd/es/select";
import { globalContext } from "../contexts/globalContext"
import { dynamicContext } from "../contexts/dynamicContext";
import Title from "antd/es/typography/Title";

const variable: string = "oliver";

function Dashboard(): JSX.Element {
  const { services, setServices, aggregate, setAggregate, filter, setFilter, setServiceThresholds, serviceThresholds } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)

  const dataSource: any = [];
  // add port
  useEffect(() => {
    setFilter(filter)
    console.log(serverAddress)
    const socket:any = io(serverAddress, {
      transports: ["websocket"],
    });
    socket.on("connection", () => {
      console.log(socket.id);
    });
    socket.on("real-time-object", (output: any) => {
      console.log("new update");

      const newData = JSON.parse(output);
      setAggregate(newData.aggregate);
      setServices(newData.services);
      console.log(newData.aggregate);
      console.log(newData.services);
    });

    setServices([
      {
        service: "a",
        status: "good",
        load: 4,
        response_time: 1266,
        error: 3,
        availability: 1,
        byMethod: {
          GET: {
            status: "bad",
            load: "0.6666666865348816 hpm",
            response_time: 12,
            error: 5,
            availability: 1,
          }
        }
      },
      {
        service: "b",
        status: "fair",
        load: 0,
        response_time: 1266,
        error: 50,
        availability: 100,
        byMethod: {
          GET: {
            status: "bad",
            load: 2,
            response_time: 12,
            error: 5,
            availability: 1,
          }
        }
      },
      {
        service: "c",
        status: "poor",
        load: 1,
        response_time: 1266,
        error: 5,
        availability: 152,
        byMethod: {
          GET: {
            status: "bad",
            load: "0.6666666865348816 hpm",
            response_time: 12,
            error: 5,
            availability: 1,
          }
        }
      },
      {
        service: "d",
        status: "fair",
        load: 123,
        response_time: 1266,
        error: 30,
        availability: 10,
        byMethod: {
          GET: {
            status: "bad",
            load: 1,
            response_time: 12,
            error: 5,
            availability: 1,
          }
        }
      },
      {
        service: "fsdc",
        status: "poor",
        load: 100,
        response_time: 1266,
        error: 20,
        availability: 99,
        byMethod: {
          GET: {
            status: "bad",
            load: "0.6666666865348816 hpm",
            response_time: 12,
            error: 5,
            availability: 1,
          }
        }
      },
    ]);
    setAggregate({
      error: 40,
      response_time: 1278,
      load: 2,
      availability: 83,
      status: 'good'
    })
    setServiceThresholds(
      [
        {service: 'a'},
        {service: 'b'},
        {service: 'c'}
      ]
    )
    
    return () => socket.disconnect();
  }, []);

  for (let i = 0; i < services.length; i++) {
    services[i].key = i;
    let status = 0;
    if (filter[services[i].service]){
      const holder = filter[services[i].service]
      dataSource.push(services[i].byMethod[holder]);

    } else {
      // if (serviceThresholds[i].load_threshold < services[i].load) ++status
      // if (serviceThresholds[i].error_threshold < services[i].error) ++status
      // if (serviceThresholds[i].response_time_threshold < services[i].response_time) ++status
      // if (serviceThresholds[i].availability_threshold < services[i].availability) ++status
      services[i].status = status
      dataSource.push(services[i]);
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
      // sorter:{
      //   compare: (a:any, b:any) => a.status - b.status,
      // }
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
