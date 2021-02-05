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
import Typography from 'antd/es/typography';
const { Title } = Typography
import { changeChildArr, test, treeData } from '../charts/dataFuncDepGraph'

function DependencyGraphContainer(): JSX.Element{
  const { serverAddress } = useContext(globalContext)
  const { aggregate, services, dependencyGraph, setAggregate,setServices, setDependencyGraph } = useContext(dynamicContext)
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
      console.log('heres where we start with Newdata.services', newData.services);
      console.log('and heres our services', services, 'and dependencyGraph in data coming back', newData.dependencyGraph)
      console.log(' heres where well parse the services coming in', changeChildArr(newData.services))
      console.log(' heres what the dummy data parse looks like', changeChildArr(test.services))
      // console.log('is this the corret format for the dependency graph data going to graph?', newData.dependencyGraph);
      const dataForDep = {
        service: "Services",
        status: 'good',
        children: changeChildArr(newData.services)}
        setDependencyGraph(dataForDep)
        console.log(dataForDep, treeData)
    });

    return () => socket.disconnect();
    
  }, []);
  console.log('dep graph data in context', dependencyGraph)
  return(
    <div id="chartContainer">
        <AggregateStats 
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
        />
         <Divider><Title level={3}>Dependency graph</Title></Divider>
          <Card hoverable={true} style={{width: 1050}}>
            <DependencyGraph width={1000} height={700} />
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };
