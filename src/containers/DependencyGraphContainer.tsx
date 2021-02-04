import React, { Component, useContext, useEffect, useState } from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import { AggregateStats } from '../components/AggregateStats';
import { globalContext } from "../contexts/globalContext"
import { dynamicContext } from '../contexts/dynamicContext';
import Divider from 'antd/es/divider';
import Title from 'antd/es/typography/Title';
import { io } from 'socket.io-client';

function DependencyGraphContainer(): JSX.Element{
  
  const { services, setServices, aggregate, setAggregate, filter, setFilter, serviceThresholds, firstTime, setFirstTime } = useContext(dynamicContext);
  const { serverAddress } = useContext(globalContext)
  useEffect(()=> {
    const accessToken = localStorage.getItem('accessToken');
    const socket:any = io(serverAddress + ':8080', {
      transports: ["websocket"],
      query: { accessToken },
    });
    socket.on("connection", () => {
      console.log('Desktop connected to DEPENDENCY client!');
    });
    socket.on("real-time-object", (output: any) => {
      console.log(output)
      const newData = JSON.parse(output[0]);
      setAggregate(newData.aggregate);
      setServices(newData.services);      
    });
    return () => socket.disconnect();
  },[])

  return(
    <div id="chartContainer">
        <AggregateStats 
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
        />
         <Divider><Title level={3}>Dependency graph</Title></Divider>
          <Card hoverable={true} style={{width: 'total width'}}>
            <DependencyGraph width={600} height={600} />
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };
