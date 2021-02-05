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
    color: ["#215B77", "#1B9CD0", "#61C9FF", "#ABDFFF", "#EFF3DE", "#FFDE94", "#FFC741", "#D09C10", "#795B16"], "paletteQualitative20": ["#215B77", "#227BA2", "#1B9CD0", "#22BAED", "#61C9FF", "#8AD4FF", "#ABDFFF", "#C9E9FF", "#EFF3DE", "#FFE9B8", "#FFDE94", "#FFD470", "#FFC741", "#EDB40A", "#D09C10", "#A37B16", "#795B16"],
    xAxis: { 
      label: {
         formatter: function formatter(v:any) {
           return v.slice(11,16); 
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
      },
      min: 900, 
      max: 1300
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
