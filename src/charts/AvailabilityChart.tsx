/**
 * @name AvailabilityChart
 * @desc Chart that renders historical statistics for availability on the Historical Status tab. Child component of ChartContainer
 */
import React, { useState, useEffect, useContext } from 'react';
import Line from'@ant-design/charts/es/line';
import { historicalContext } from '../contexts/historicalContext';     
const Availability: React.FC = () => {
  //set context api that broadcasts to components wrapped within it to update historical state
  const { serviceData } = useContext(historicalContext)
  //set ContextAPI state object
  let config = {
    data: serviceData.availability,
    xField: 'time',
    yField: 'value',
    seriesField: 'method',
    xAxis: { type: 'time' },
    yAxis : { 
      label: {
        formatter: function formatter(v:any) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
  };
  console.log(config.data, 'config availability')
  if (config.data === undefined) return <div>loading</div>
  return <Line {...config} />;
};

export { Availability } ;  
