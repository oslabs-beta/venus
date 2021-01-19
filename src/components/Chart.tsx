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
      <h1>Cycle Duration</h1>
      <ParentSize>
        {({ width, height }) => <PerformanceChart width={800} height={400} />}
      </ParentSize>
      ,{/* <img src={require("../imgs/performanceChart2.png")} /> */}
      {/* create onClick method */}
    </div>
  );
}

export { Chart };