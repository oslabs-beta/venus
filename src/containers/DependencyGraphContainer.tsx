import React, { Component, useContext, useEffect, useState } from 'react';
import Card from 'antd/es/card';
import { DependencyGraph} from '../charts/DependencyTree'
import ParentSize from "@visx/responsive/lib/components/ParentSize";

function DependencyGraphContainer(): JSX.Element{
  
  return(
    <div id="dashboard">
        <ParentSize>
          {({ width, height }) => <DependencyGraph width={600} height={600} />}
        </ParentSize>
    </div>
  )
};

export { DependencyGraphContainer };

