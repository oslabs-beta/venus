/**
 * @name ServiceSettingsContainer
 * @desc Displays service threshold settings where user can customize display based on threshold parameters
 * Parent Container to aggregate stats displayed on top of page.
 */

import React, { useContext, useEffect } from "react";
//  import TabContainer from './TabContainer'
import { AggregateStats } from "../components/AggregateStats";
import { dynamicContext } from "../contexts/dynamicContext";
import { globalContext } from '../contexts/globalContext'
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { EditableTable } from '../components/EditableTable'
import { io } from "socket.io-client";


function SettingsContainer(): JSX.Element {
  const { services, setServices, aggregate, setAggregate } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)
  useEffect(() => {
    const socket:any = io(serverAddress + ':8080', {
      transports: ["websocket"],
    });
    socket.on("connection", () => {
      console.log('connected')
    });
    console.log('past connection req')
    socket.on("real-time-object", (output: any) => {
      console.log(output)
      const newData = JSON.parse(output[0]);
      setAggregate(newData.aggregate);
    });
  

    return () => socket.disconnect();
    
  }, []);


  return (
    <div id="chartContainer">
      <AggregateStats
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
      />
      <Divider>
        <Title level={3}>Service Threshold Settings</Title>
      </Divider>
      <EditableTable />
    </div>
  );
}

export { SettingsContainer };
