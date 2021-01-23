import React, { Component, useContext, useEffect, useState } from 'react';
import { DependencyTree } from '../charts/DependencyTree'
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import ParentSize from "@visx/responsive/lib/components/ParentSize";

function DependencyGraphContainer(): JSX.Element{
  
  return(
    <div id="dashboard">
      <Card hoverable={true}>
        <ParentSize>
          {({ width, height }) => <DependencyGraph width={950} height={900} />}
        </ParentSize>
        dependencyGraph will go here.
      </Card>
    </div>
  )
};

export { DependencyGraphContainer };

