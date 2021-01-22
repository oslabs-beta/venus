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
										
function AggregateStats(): JSX.Element{
    return (
<<<<<<< HEAD
		
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Col span={4}>
			<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							title="Title"
							value="Codesmith"
							precision={2}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
			</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							className="aggregateCards1"
							title="Health"
							value={"GOOD"}
							precision={2}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card className="aggregateCards" bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							title="Availability"
							value={94.28}
							precision={2}
							valueStyle={{ color: '#3f8600' }}
							suffix="%"
						/>
					</Card>
					</div>
				</Col>
=======
		// <div className="parentCardContainer">
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				{/* <div className="childCardContainer"> */}
					<Col span={4}>
						<Card bordered={true} bodyStyle={{width: 200}} hoverable={true}>
							<Statistic
								title="Title"
								value="Codesmith"
								precision={2}
								valueStyle={{ color: '#3f8600' }}
							/>
						</Card>
					</Col>
					<Col span={4}>
						<Card bordered={true} bodyStyle={{width: 200}} hoverable={true}>
							<Statistic
								title="Health"
								value={"GOOD"}
								precision={2}
								valueStyle={{ color: '#3f8600' }}
							/>
						</Card>
					</Col>
					<Col span={4}>
						<Card bordered={true} bodyStyle={{width: 200}} hoverable={true}>
							<Statistic
								title="Availability"
								value={94.28}
								precision={2}
								valueStyle={{ color: '#3f8600' }}
								suffix="%"
							/>
						</Card>
					</Col>
				{/* </div> */}																
				{/* <div className="childCardContainer"> */}
>>>>>>> d54a04a7d79608092621951fc5f6819d47167fb2
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							title="Latency"
							value={9.3}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="ms"
						/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							title="Load"
							value={9.3}
							precision={2}
							valueStyle={{color: '#cf1322'}}
							suffix="hpm"
						/>
					</Card>
					</div>
				</Col>
				<Col span={4}>
				<div className="aggregate">
					<Card bordered={true} bodyStyle={{width: "200px"}} hoverable={true}>
						<Statistic
							title="Response Error"
							value={6.9}
							precision={2}
							valueStyle={{ color: '#cf1322' }}
							suffix="%"
						/>
					</Card>
					</div>
				</Col>
				{/* </div> */}
			</Row>
<<<<<<< HEAD
		
=======
		// </div>
>>>>>>> d54a04a7d79608092621951fc5f6819d47167fb2
  )
};

export { AggregateStats };


