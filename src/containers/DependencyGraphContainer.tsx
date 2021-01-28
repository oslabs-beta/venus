import React, { useContext, useEffect,} from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import { AggregateStats } from '../components/AggregateStats';
import { dynamicContext } from '../contexts/dynamicContext';
import Divider from 'antd/es/divider';
import Title from 'antd/es/typography/Title';


function DependencyGraphContainer(): JSX.Element{
  
  const { aggregate, services } = useContext(dynamicContext)
  useEffect(()=> {

  },[])

  return(
<<<<<<< HEAD
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
=======
    <div id="dashboard">
      <Card hoverable={true} >
        <ParentSize>
          {({ width, height }) => <DependencyGraph width={1200} height={800} />}
        </ParentSize>
      </Card>
>>>>>>> f61b1492e1f49fc3ab8e828c44a1cdbe979c6f57
    </div>
  )
};

export { DependencyGraphContainer };

