import React, { useState, useEffect, useContext } from 'react';    
import Area  from '@ant-design/charts/es/area';
import { historicalContext } from '../contexts/historicalContext';
function LoadChart(): JSX.Element {
  const { serviceData } = useContext(historicalContext) 
    
  var config ={ 
    data : serviceData ,
    xField: 'year',
    yField:'value', 
    seriesField: 'category',
  };
  return <Area {...config} autoFit={true} />;
};
export { LoadChart };