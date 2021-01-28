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
import Form from "antd/es/form";
import Select from "antd/es/select";
import { globalContext } from "../contexts/globalContext"
import { dynamicContext } from "../contexts/dynamicContext";
import Title from "antd/es/typography/Title";

const variable: string = "oliver";

function Dashboard(): JSX.Element {
  const { services, setServices, aggregate, setAggregate } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)

  const dataSource: any = [];
  useEffect(() => {
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
        service: "abc",
        status: "good",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "bcd",
        status: "fair",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "cde",
        status: "poor",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "def",
        status: "good",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "efg",
        status: "fair",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "fgh",
        status: "poor",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "ghi",
        status: "good",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "hij",
        status: "fair",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "ijk",
        status: "poor",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "jkl",
        status: "good",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "klm",
        status: "fair",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "lmnopqrstuvwx",
        status: "poor",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      {
        service: "mnopqrstuvwxyz",
        status: "good",
        load: "0.6666666865348816 hpm",
        response_time: 1266,
        error: 50,
        availability: 100,
      },
      
    ]);
    setAggregate({
      error: 40,
      response_time: 1278,
      load: 2,
      availability: 83,
      status: 'good'
    })
    return () => socket.disconnect();
  }, []);

  for (let i = 0; i < services.length; i++) {
    services[i].key = i;
    dataSource.push(services[i]);
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
      render: (status: string) => {
        if (status === "good") {
          return <Tag color={"green"}>GOOD</Tag>;
        }
        if (status === "fair") {
          return <Tag color={"orange"}>FAIR</Tag>;
        }
        if (status === "poor") {
          return <Tag color={"red"}>POOR</Tag>;
        }
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: () => (
        <Form>
          <Form.Item className="apiMethod" initialValue="all">
            <Select
              placeholder="ALL METHODS"
              style={{ width: 140 }}
            >
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
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
    },
    {
      title: "Response Time",
      dataIndex: "response_time",
      key: "response_time",
    },
    {
      title: "Load",
      dataIndex: "load",
      key: "load",
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
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
