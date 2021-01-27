  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */

import React from "react";
import { LineGraph } from "../charts/LineGraph"
import { AreaChart } from "../charts/AreaChart"
import { CardDropDown } from "../components/CardDropDown";
// import { TestChart } from "../charts/TestChart";
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Divider from "antd/es/divider";
import { AggregateStats } from "../components/AggregateStats";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text"
import { HistoricalProvider } from "../contexts/historicalContext";
import { Availability } from "../charts/AvailabilityChart";
import { LoadChart } from "../charts/LoadChart";

export function ChartContainer(): JSX.Element {

  const getData = () => {

  }

  return (
    <div id="chartContainer">
    <HistoricalProvider>
      <AggregateStats />
      <Divider><Title level={3}>Historical Status</Title></Divider>
      <div className="rangeSelectorContainer">
        <CardDropDown /> 
        <Text className="rangeSelector" strong={true}>1 hour</Text>
        <Text className="rangeSelector" strong={true}>1 day</Text>
        <Text className="rangeSelector" strong={true}>1 week</Text>
        <Text className="rangeSelector" strong={true}>1 month</Text>
      </div>
        <Row gutter={[32,32]}>
          <Col span={12}>
            <Title level={5}>Availability</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <Availability />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Latency</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              {/* <LineGraph /> */}
              <Availability />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32,32]}>
          <Col span={12}>
            <Title level={5}>Error Rate</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <AreaChart />
            </Card>
          </Col>
          <Col span={12}>
          <Title level={5}>Load</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <LoadChart />
            </Card>
          </Col>
        </Row>
        </HistoricalProvider>
    </div>
  )
}
