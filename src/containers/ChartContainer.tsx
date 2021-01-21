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
import { Chart } from "../components/Chart";
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import { HistoricalProvider } from '../contexts/historicalContext'


export default function ChartContainer(): JSX.Element {



  return (
   
    <div id="chartContainer">
      <HistoricalProvider>
      <CardDropDown /> 
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div className="graphHolder">
              <LineGraph />
            </div>
          </Col>
          <Col span={12}>
            <div className="graphHolder" >
              <AreaChart />
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
        <Col span={12}>
            <div className="graphHolder">
              <LineGraph />
            </div>
          </Col>
          <Col span={12}>
            <div className="graphHolder">
              <PieChart />
            </div>
          </Col>
        </Row>
        </HistoricalProvider>
    </div>
  )
}
