
import React, { useContext, useState } from 'react'
import { myContext } from "../contexts/globalContext"
import Typography from 'antd/es/typography';
// import { CheckCircleFilled } from '@ant-design/icons';
const { Title } = Typography

function ServiceCard (props: { service: any }): JSX.Element{
  const { urls } = useContext(myContext)
  
  console.log(props)
  const color: string = props.color
    return (
      (
        <div className= "aggregateStats">
  
            <Title level={3}>{props.name}</Title>
            {/* <CheckCircleFilled /> */}
            <div className="icon" style={{backgroundColor: color}}></div>
          <div className="allStats">
            <div className="statsContainer">
              <Title level={5}>Uptime</Title>
              <div className="dataContainer">
                <Title level={5}>{props.uptime}</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Latency</Title>
              <div className="dataContainer">
                <Title level={5}>{props.latency}</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Load</Title>
              <div className="dataContainer">
                <Title level={5}>{props.load}</Title>
              </div>
            </div>
            <div className="statsContainer">
              <Title level={5}>Error %</Title>
              <div className="dataContainer">
                <Title level={5}>{props.error}</Title>
              </div>
            </div>
          </div>
        </div>
    )
    )
  }

export { ServiceCard };