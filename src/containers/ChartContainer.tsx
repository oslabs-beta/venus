  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */

import React from "react";
import { CardDropDown } from "../components/CardDropDown";
import { Chart } from "../components/Chart";
import { Row, Col } from 'antd'
function ChartContainer(): JSX.Element {
  return (
   
    <div id="chartContainer">
      <CardDropDown /> 

        <Row gutter={[16, 16]}>
          <Col span={12}>test</Col>
          <Col span={12}>test</Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>test</Col>
          <Col span={12}>test</Col>
        </Row>
      <Chart />
    </div>

// onChange={onChange} >> add for stat level sortability. 
  );
}

export { ChartContainer };
