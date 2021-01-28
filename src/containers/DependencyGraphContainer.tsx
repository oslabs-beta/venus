import React, { Component, useContext, useEffect, useState } from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { AggregateStats } from '../components/AggregateStats';
import Divider from 'antd/es/divider';
import Title from 'antd/es/typography/Title';


function DependencyGraphContainer(): JSX.Element{
  
  return(
    <div id="chartContainer">
        <AggregateStats />
         <Divider><Title level={3}>Dependency graph</Title></Divider>
          <Card hoverable={true} style={{width: 'fit-content'}}>
  
               <DependencyGraph width={600} height={600} />
           
          </Card>
    </div>
  )
};

export { DependencyGraphContainer };

