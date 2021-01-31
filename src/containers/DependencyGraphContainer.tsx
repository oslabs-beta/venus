import React, { Component, useContext, useEffect, useState } from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import { AggregateStats } from '../components/AggregateStats';
import { dynamicContext } from '../contexts/dynamicContext';
import Divider from 'antd/es/divider';
import Typography from 'antd/es/typography';
import ParentSize from "@visx/responsive/lib/components/ParentSize";
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
          <Card hoverable={true} style={{width: 'fit-content'}}>
            <Title level={5}>Service Endpoints and Method Dependencies</Title>
          </Card>
          <Card hoverable={true} style={{width: 'fit-content'}}>
            <DependencyGraph width={600} height={600} />
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };

