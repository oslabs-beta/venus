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
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Divider from "antd/es/divider";
import { AggregateStats } from "../components/AggregateStats";
import Title from "antd/es/typography/Title";
import Space from 'antd/es/space';
import { HistoricalProvider } from "../contexts/historicalContext";

export function ChartContainer(): JSX.Element {

  return (
   
    <div id="chartContainer">
      <AggregateStats />
      <Divider><Title level={3}>Historical Status</Title></Divider>
      <div style={{marginBottom: 20}}>
        <CardDropDown /> 
      </div>
      <HistoricalProvider>
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
        </HistoricalProvider>
    </div>
  )
}
