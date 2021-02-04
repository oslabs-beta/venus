/**
 * @name DependencyGraphContainer
 * @desc Parent container that holds both Aggregate stats and DependencyTree
 */
import { io } from "socket.io-client";
import React, { useContext, useEffect,} from 'react';
import Card from 'antd/es/card';
import { DependencyGraph } from '../charts/DependencyTree'
import { AggregateStats } from '../components/AggregateStats';
import { globalContext } from "../contexts/globalContext"
import { dynamicContext } from '../contexts/dynamicContext';
import Divider from 'antd/es/divider';
import Title from 'antd/es/typography/Title';

function DependencyGraphContainer(): JSX.Element{
  const { serverAddress } = useContext(globalContext)
  const { aggregate, services, setAggregate,setServices } = useContext(dynamicContext)
  useEffect(() => {
    
   
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
      console.log("new update");
      console.log(output)
      const newData = JSON.parse(output[0]);
      setAggregate(newData.aggregate);
      setServices(newData.services);
      console.log(newData.aggregate);
      console.log(newData.services, 'services');
    });

    return () => socket.disconnect();
    
  }, []);

  return(
    <div id="chartContainer">
        <AggregateStats 
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
        />
         <Divider><Title level={3}>Dependency graph</Title></Divider>
          <Card hoverable={true} style={{width: 'fit-content'}}>
            <DependencyGraph width={600} height={600} />
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };
