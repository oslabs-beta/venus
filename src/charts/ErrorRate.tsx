/**
 * @name ErrorRate
 * @desc Chart that displays in historical status page rendering historical load statistics. Child component of ChartContainer.
 */

import React, { useContext } from "react";
import Line from "@ant-design/charts/es/line";
import { historicalContext } from "../contexts/historicalContext";
const ErrorRate: React.FC = () => {
  
  const { serviceData } = useContext(historicalContext);

  let config = {
            data: serviceData.error_rate,
            xField: "timestamp",
            yField: "value",
            color: ["#FF6B3B", "#626681", "#FFC100", "#9FB40F", "#76523B", "#DAD5B5", "#0E8E89", "#E19348", "#F383A2", "#247FEA"], "paletteQualitative20": ["#FF6B3B", "#626681", "#FFC100", "#9FB40F", "#76523B", "#DAD5B5", "#0E8E89", "#E19348", "#F383A2", "#247FEA", "#2BCB95", "#B1ABF4", "#1D42C2", "#1D9ED1", "#D64BC0", "#255634", "#8C8C47", "#8CDAE5", "#8E283B", "#791DC9"],
            autoAdjust: true,            
            xAxis: {
              max: 15, 
              label: {
                formatter: function formatter(v:any) {
                  return v.slice(11,16); 
                }
             }
            },
            yAxis: {
              label: {
                formatter: function formatter(v:any) {
                  return v + '%'; 
                }
             }
            },
            seriesField: "service", 
            animation: {
              appear: {
                animation: 'path-in',
                duration: 1000,
              },
            },
          };
  console.log(config.data, 'config error_rate')
  return <Line {...config} />;
}
export { ErrorRate };