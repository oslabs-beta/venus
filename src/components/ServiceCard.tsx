/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React, { useContext } from 'react'
import { myContext } from "../contexts/globalContext"
import Typography from 'antd/es/typography';
// import { CheckCircleFilled } from '@ant-design/icons';
const { Title } = Typography
<<<<<<< HEAD

<<<<<<< HEAD


function ServiceCard (): JSX.Element{
    const { urls } = useContext(myContext)
console.log({urls}, 'urls')
let urlList: any[] = [];
let friends: string[] = urls
for (let i = 0; i < urls.length ; i++){
  urlList.push(<button key={i} >{friends[i]}</button>)
}



    return (
      <div className="serviceCard">
          {/* <h1>{urls}</h1> */}
          {urlList}
      </div>
=======
function ServiceCard (props: any): JSX.Element{
  const { urls } = useContext(myContext)
  const color: string = props.color
    return (
=======

function ServiceCard (props: any): JSX.Element{
  const { urls } = useContext(myContext)
  const color: string = props.color
    return (
>>>>>>> 7d15f6ae0e3da3d60299f5ad451c65e0f21a0f5b
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
<<<<<<< HEAD
>>>>>>> 7d15f6ae0e3da3d60299f5ad451c65e0f21a0f5b
=======
>>>>>>> 7d15f6ae0e3da3d60299f5ad451c65e0f21a0f5b
    )
  }

export { ServiceCard };