/**
 * @name Chart
 * @desc Each individual chart displayed inside Chart Container
 */
import PerformanceChart from "./CyclePerformanceChart";
import  ParentSize from "@visx/responsive/lib/components/ParentSize";
import React from 'react';

function Chart(): JSX.Element {
  return (
    <div className="chart">
      <h1>Individual Chart</h1>
      <ParentSize>
        {({ width, height }) => <PerformanceChart width={width} height={800} />}
      </ParentSize>
      ,{/* <img src={require("../imgs/performanceChart2.png")} /> */}
      {/* create onClick method */}
    </div>
  );
}

export { Chart };