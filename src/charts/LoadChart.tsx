/**
 * @name LoadChart
 * @desc Chart that displays in historical status page rendering historical load statistics. Child component of ChartContainer.
 */

import React, { useContext,useEffect } from "react";
import Area from "@ant-design/charts/es/area";
import { historicalContext } from "../contexts/historicalContext";
function LoadChart(): JSX.Element {

  const { serviceData } = useContext(historicalContext);
  
  let config = {
    data: serviceData.load,
    xField: "timestamp",
    yField: "value",
    seriesField: "service",
    xAxis: {
      label: {
        formatter: function formatter(v:any) {
          return v.slice(11,16); 
        }
     }, 
     yAxis: {
       max: 200
     } 
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };
  console.log(config.data, 'config load')
  return <Area {...config} />;
}
export { LoadChart };