/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */

import React from 'react'
import { Statistic, Card, Row, Col } from 'antd';

										
function AggregateStats(): JSX.Element{
    return (
			<Row gutter={30}>
				<Col span={6}>
					<Card bordered={true} bodyStyle={{width: "200px"}}>
						<Statistic
							title="System Uptime"
							value={94.28}
							precision={2}
							valueStyle={{ color: '#3f8600' }}
							suffix="%"
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={true}>
						<Statistic
							title="System Latency"
							value={9.3}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="ms"
						/>
					</Card>
				</Col>
				<Col span={6}>
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
				<Col span={6}>
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
  )
};

export { AggregateStats };


