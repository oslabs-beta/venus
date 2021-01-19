/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */

import React from 'react'
import Typography from 'antd/es/typography';
// import { CheckCircleFilled } from '@ant-design/icons';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

										
function AggregateStats(): JSX.Element{
    return (
		
		<div className="aggregateStats">
			<Row gutter={[8,8]}>
				<Col span={7}>
					<Card>
						<Statistic
							title=" System Uptime"
							value={94.28}
							precision={2}
							valueStyle={{ color: '#3f8600' }}
							suffix="%"
						/>
					</Card>
				</Col>
				<Col span={7}>
					<Card>
						<Statistic
							title="System Latency"
							value={9.3}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="ms"
						/>
					</Card>
				</Col>
				<Col span={7}>
					<Card>
						<Statistic
							title="System Load"
							value={9.3}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="hpm"
						/>
					</Card>
				</Col>
				<Col span={7}>
					<Card>
						<Statistic
							title="System Error"
							value={6.9}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="%"
						/>
					</Card>
				</Col>
			</Row>
  </div>
  )
};

export { AggregateStats };


{/* <CheckCircleFilled />
<ExclamationCircleFilled />
<CloseCircleFilled /> */}