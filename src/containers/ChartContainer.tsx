  /**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */
import React, { useContext, useEffect} from "react";
import { AreaChart } from "../charts/AreaChart"
import { CardDropDown } from "../components/CardDropDown";
import { historicalContext } from "../contexts/historicalContext"
import { AggregateStats } from "../components/AggregateStats";
import { Availability } from "../charts/AvailabilityChart";
import { LoadChart } from "../charts/LoadChart";
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import Radio from 'antd/es/radio'



function ChartContainer(): JSX.Element {
  const [value, setValue] = React.useState(1);
  const { aggregate, setAggregate, service, } = useContext(historicalContext)
  let filter = aggregate;
  const test: any = {
    status: 'hello',
    load: 12,
    response_time: 12, 
    error: 12,
    availability: 12,
  }
  useEffect(() => {
    setAggregate(test)
    // fetch('localhost:3000/get/historicdata').then(
    //   response => response.json()
    // ).then(
    //   data => console.log(data)
    // )
  },[])
  
  const options = [
    { label: 'Last Hour', value: 'lastHour' },
    { label: 'Last Day', value: 'lastDay' },
    { label: 'Last Week', value: 'lastWeek' },
    { label: 'Last Month', value: 'lastMonth' },
  ];


  const filterData = (e:any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div id="chartContainer">
      <AggregateStats
      error={aggregate.error}
      response_time={aggregate.response_time}
      load={aggregate.load}
      availability={aggregate.availability}
      />
      <Divider><Title level={3}>Historical Status</Title></Divider>
      <div className="rangeSelectorContainer">
        <CardDropDown  />
        <div className="">
          <Radio.Group optionType="button"  onChange={filterData} options={options}/>
        </div>
      </div>
        <Row gutter={[32,32]}>
          <Col span={12}>
            <Title level={5}>Availability</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <Availability />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Latency</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <Availability />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32,32]}>
          <Col span={12}>
            <Title level={5}>Error Rate</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <AreaChart />
            </Card>
          </Col>
          <Col span={12}>
          <Title level={5}>Load</Title>
            <Card bordered={true} hoverable={true} style={{width: "500px"}}>
              <LoadChart />
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export { ChartContainer }