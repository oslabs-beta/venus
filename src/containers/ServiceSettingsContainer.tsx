/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

import React, { useContext, useEffect, useState } from "react";
//  import TabContainer from './TabContainer'
import { AggregateStats } from "../components/AggregateStats";
import { dynamicContext } from "../contexts/dynamicContext";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { EditableTable } from './TestServiceSettings'

function SettingsContainer(): JSX.Element {
  const { services, setServices, aggregate, setAggregate } = useContext(
    dynamicContext
  );

  const dataSource: any = [];
  useEffect(() => {
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
      sorter: {
        compare: (a:any, b:any) => a.title.length - b.title.length,
      }
    },
    {
      title: "Availability Threshold",
      dataIndex: "availability",
      key: "availability",
      sorter: {
        compare: (a:any, b:any) => a.availability - b.availability,
      }
    },
    {
      title: "Response Time Threshold",
      dataIndex: "response_time",
      key: "response_time",
    },
    {
      title: "Load Threshold",
      dataIndex: "load",
      key: "load",
    },
    {
      title: "Error Threshold",
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
        <Title level={3}>Service Settings</Title>
      </Divider>
      <EditableTable />
    </div>
  );
}

export { SettingsContainer };
