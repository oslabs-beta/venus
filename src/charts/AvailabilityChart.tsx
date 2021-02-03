/**
 * @name AvailabilityChart
 * @desc Chart that renders historical statistics for availability on the Historical Status tab. Child component of ChartContainer
 */
import React, { useState, useEffect, useContext } from 'react';
import Line from'@ant-design/charts/es/line';
import { historicalContext } from '../contexts/historicalContext';     
const Availability: React.FC = () => {
  //set context api that broadcasts to components wrapped within it to update historical state
  const { aggregate, serviceData } = useContext(historicalContext)
  //set ContextAPI state object
  const [data, setData] = useState([]);
  let config = {
    data: serviceData,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
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
  console.log(config.data, 'config')
  if (config.data === undefined) return <div>loading</div>
  return <Line {...config} />;
};

export { Availability } ;  
