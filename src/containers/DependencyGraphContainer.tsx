import React, { Component, useContext, useEffect, useState } from 'react';
import { DependencyTree } from '../charts/DependencyTree'
import Card from 'antd/es/card';
function DependencyGraphContainer(): JSX.Element{
  
  return(
    <div id="dashboard">
      <Card hoverable={true}>
        {/* <DependencyTree /> */}
        dependencyGraph will go here.
      </Card>

    </div>
  )
};

export { DependencyGraphContainer };