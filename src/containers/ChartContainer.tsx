  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */

import React from "react";
import { LineGraph } from "../charts/LineGraph"
import { AreaChart } from "../charts/AreaChart"
import { CardDropDown } from "../components/CardDropDown";
// import { TestChart } from "../charts/TestChart";
import PieChart from "../charts/PieChart";
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Card from 'antd/es/card'
import Divider from "antd/es/divider";


function ChartContainer(): JSX.Element {
  return (
   
    <div id="chartContainer">
      <CardDropDown /> 
      <Divider></Divider>
        <Row gutter={[32,32]}>
          <Col span={12}>
          <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <LineGraph />
            </Card>
          </Col>
          <Col span={12}>
          <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <AreaChart />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32,32]}>
          <Col span={12}>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <LineGraph />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <PieChart />
            </Card>
          </Col>
        </Row>
    </div>

// onChange={onChange} >> add for stat level sortability. 
  );
}

export { ChartContainer };
