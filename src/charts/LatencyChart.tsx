/**
 * @name LatencyChart
 * @desc Chart that renders historical statistics for availability on the Historical Status tab. Child component of ChartContainer
 */
import React, { useContext } from 'react';
import Line from'@ant-design/charts/es/line';
import { historicalContext } from '../contexts/historicalContext';     
const Latency: React.FC = () => {
  
  const { aggregate, serviceData } = useContext(historicalContext)
  
  let config = {
    data: serviceData.response_time,
    xField: "timestamp",
    yField: 'value',
    seriesField: 'service',
    xAxis: { 
      label: {
         formatter: function formatter(v:any) {
           return v.slice(11,19); 
         }
      }
     },
    yAxis : { 
      label: {
        formatter: function formatter(v:any) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
        min: 500
      },
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };
  console.log(config.data, 'config responseTime')
  return <Line {...config} />;
};

export { Latency } ;  
