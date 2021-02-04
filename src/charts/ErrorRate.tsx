/**
 * @name ErrorRate
 * @desc Chart that displays in historical status page rendering historical load statistics. Child component of ChartContainer.
 */

import React, { useState, useEffect, useContext } from "react";
import Area from "@ant-design/charts/es/area";
import { historicalContext } from "../contexts/historicalContext";
function ErrorRate(): JSX.Element {
  
  const { serviceData } = useContext(historicalContext);

  let config = {
            data: serviceData.error_rate,
            xField: "timestamp",
            yField: "value",
            seriesField: "service",
          };
  console.log(config.data, 'config error_rate')
  return <Area {...config} autoFit={true} />;
}
export { ErrorRate };
