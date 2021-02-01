import React, { Component, useContext, useEffect, useState } from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import { AggregateStats } from '../components/AggregateStats';
import { dynamicContext } from '../contexts/dynamicContext';
import Divider from 'antd/es/divider';
import Typography from 'antd/es/typography';
const { Title } = Typography

function DependencyGraphContainer(): JSX.Element{
  
  const { aggregate, services } = useContext(dynamicContext)
  useEffect(()=> {

  },[])

  return(
    <div id="chartContainer">
        <AggregateStats 
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
        />
          <Divider><Title level={3}>Service Endpoints and Method Dependencies</Title></Divider>
          <Card hoverable={true} style={{width: 'total width'}}>
            <DependencyGraph width={600} height={600} />
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };

