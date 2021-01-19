/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React, { useContext } from 'react'
import { myContext } from "../contexts/globalContext"
import Typography from 'antd/es/typography';
// import { CheckCircleFilled } from '@ant-design/icons';
const { Title } = Typography

function ServiceCard (): JSX.Element{
  const { urls } = useContext(myContext)
    return (
      (
        <div className= "aggregateStats">
  
            <Title level={3}>Overall Health</Title>
            {/* <CheckCircleFilled /> */}
            <div className="icon"></div>
          <div className="allStats">
            <div className="statsContainer">
              <Title level={5}>Uptime</Title>
              <div className="dataContainer">
                <Title level={5}>97%</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Latency</Title>
              <div className="dataContainer">
                <Title level={5}>250ms</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Load</Title>
              <div className="dataContainer">
                <Title level={5}>50req/min</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Error %</Title>
              <div className="dataContainer">
                <Title level={5}>3.413%</Title>
              </div>
            </div>
          </div>
        </div>
    )
    )
  }

export { ServiceCard };