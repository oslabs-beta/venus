/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */
import React from 'react'
import Statistic from 'antd/es/statistic'
import Card from 'antd/es/card'
import Row from 'antd/es/row'
import Col from 'antd/es/col'


type colors = {
	good: string
	fair: string
	bad: string
}
const color: colors = {
	good: '#52c41a',
	fair: '#fa8c16',
	bad: '#f5222d'
}

function AggregateStats(props: any): JSX.Element{
    return (
	<div className="cardRow">
	<Row gutter={32}>
				<Col span={4}>
			<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Title"
							value="System"
							precision={2}
							// valueStyle={{ color: color.good }}
						/>
					</Card>
			</div>
				</Col>
				{/* <Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							title="Health"
							value={'GOOD'}
							precision={2}
							// valueStyle={{ color: color.bad }}
						/>
					</Card>
					</div>
				</Col> */}
				<Col span={4}>
				<div className="aggregate">
					<Card className="aggregateCards" bordered={true} bodyStyle={{width: "190px"}} hoverable={true}>
						<Statistic
							className="stats"
							title="Availability"
							value={props.availability}
							precision={2}
							// valueStyle={{ color: color.good }}
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
							// valueStyle={{ color: color.fair }}
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
							// valueStyle={{ color: color.fair }}
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
							// valueStyle={{ color: color.fair }}
							suffix="%"
							/>
					</Card>
					</div>
				</Col>
			</Row>
	</div>
  )
};

export { AggregateStats };


