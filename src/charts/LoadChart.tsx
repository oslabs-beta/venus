/**
 * @name LoadChart
 * @desc Chart that displays in historical status page rendering historical load statistics. Child component of ChartContainer.
 */

import React, { useContext } from "react";
import Area from "@ant-design/charts/es/area";
import { historicalContext } from "../contexts/historicalContext";
function LoadChart(): JSX.Element {

  const { serviceData } = useContext(historicalContext);
  
  let config = {
    data: serviceData.load,
    xField: "time",
    yField: "value",
    seriesField: "method",
  };
  console.log(config.data, 'config load')
  return <Area {...config} autoFit={true} />;
}
export { LoadChart };
