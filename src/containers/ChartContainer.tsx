  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */

import React from "react";
import { CardDropDown } from "../components/CardDropDown";
import { Chart } from "../components/Chart";

function ChartContainer(): JSX.Element {
  return (
   
    <div id="chartContainer">
      <h1>Chart Container</h1>
      <CardDropDown /> 
      <Chart />
    </div>

// onChange={onChange} >> add for stat level sortability. 
  );
}

export { ChartContainer };
