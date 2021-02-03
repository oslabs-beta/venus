/**
 * @name LoadChart
 * @desc Chart that displays in historical status page rendering historical load statistics. Child component of ChartContainer.
 */

import React, { useState, useEffect, useContext } from "react";
import Area from "@ant-design/charts/es/area";
import { historicalContext } from "../contexts/historicalContext";
function LoadChart(): JSX.Element {
const { timeRange } = useContext(historicalContext);
  console.log(timeRange.load)
  var config = {
    data: timeRange.load,
    xField: "time",
    yField: "value",
    seriesField: "method",
  };
  return <Area {...config} autoFit={true} />;
}
export { LoadChart };
