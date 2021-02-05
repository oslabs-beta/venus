/**
 * @name AggregateStats
 * @desc Child container rendered in DependencyGraph, ChartContainer, ServiceSettingsContainer, and Dashboard.
 *  Displays service cards that render on top of each page, giving Aggregate stats of the system or selected service.
 */
import React from 'react'
import Statistic from 'antd/es/statistic'
import Card from 'antd/es/card'
import Row from 'antd/es/row'
import Space from 'antd/es/space';
import Col from 'antd/es/col'


function AggregateStats(props: any): JSX.Element{
    return (
	<div className="cardRow">
	<Row gutter={32}>
		<Space className="cardRow" direction="horizontal">
				<Col span={4}>
			<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Title"
							value="System"
							precision={2}
						/>
					</Card>
			</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card className="aggregateCards" bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Availability"
							value={props.availability}
							precision={2}
							suffix="%"
						/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							title="Response Time"
							value={props.response_time}
							precision={2}
							suffix="ms"
							/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Load"
							value={props.load}
							precision={2}
							suffix="hpm"
							/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Response Error"
							value={props.error}
							precision={2}
							suffix="%"
							/>
					</Card>
					</div>
				</Col>
			</Space>
		</Row>
	</div>
  )
};

export { AggregateStats };


