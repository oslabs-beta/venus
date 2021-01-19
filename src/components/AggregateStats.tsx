/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */

import React from 'react'
import Typography from 'antd/es/typography';
// import { CheckCircleFilled } from '@ant-design/icons';
const { Title } = Typography

function AggregateStats(): JSX.Element{
    return (
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
};

export { AggregateStats };


{/* <CheckCircleFilled />
<ExclamationCircleFilled />
<CloseCircleFilled /> */}