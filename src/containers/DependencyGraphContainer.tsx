import React, { Component, useContext, useEffect, useState } from 'react';
import { DependencyTree } from '../charts/DependencyTree'
import Card from 'antd/es/card';
function DependencyGraphContainer(): JSX.Element{
  
  return(
    <div id="dashboard">
      <Card hoverable={true}>
        {/* <DependencyTree /> */}
      </Card>
    </div>
  )
};

export { DependencyGraphContainer };

