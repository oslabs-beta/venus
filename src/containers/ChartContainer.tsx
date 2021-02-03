/**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart
 */
import React, { useContext, useEffect, useState } from "react";
import { CardDropDown } from "../components/CardDropDown";
import { historicalContext } from "../contexts/historicalContext";
import { dynamicContext } from "../contexts/dynamicContext";
import { AggregateStats } from "../components/AggregateStats";
import { Availability } from "../charts/AvailabilityChart";
import { LoadChart } from "../charts/LoadChart";
import { ErrorRate } from '../charts/ErrorRate';
import Row from "antd/es/row";
import Col from "antd/es/col";
import Card from "antd/es/card";
import { Spin, Alert } from "antd";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import Radio from "antd/es/radio";
import Button from "antd/es/button";
import axios from "axios";
import dummyData from "../../session_storage/dummy_data.json";
function ChartContainer(): JSX.Element {
  let dataProps;
  const [bool, setBool] = useState(false);
  const {
    aggregate,
    setAggregate,
    service,
    serviceData,
    setService,
    setServiceData,
    timeRange,
    setTimeRange,
  } = useContext(historicalContext);
  const { serviceNames } = useContext(dynamicContext);
  const test: any = {
    status: 0,
    load: 12,
    response_time: 12,
    error: 12,
    availability: 12,
  };
 

  const generateData = async () => {
    await setTimeRange(dummyData.oneHour)
    await setServiceData(dummyData)
    setBool(true);
  }

  useEffect(() => {
    // generateData()
    setAggregate(test);

    // fetch the data
    // save the master object in memory. 
    // key into the master object and overwrite a variable. 
    // that variable will be passed down as props. 

    //


    // axios.get('ec2instance'+'/getHistorical').then(function(response){
    //   setServiceData(response.data)
    // })
    // .catch(function(error){
    //   console.log(error,'error')
    // })
    axios
      .get(
        "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
      )
      .then((response) => {
        setServiceData(dummyData);
        setBool(true);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });


  }, []);

  // temporal options for chart displays
  const options = [
    { label: "Last Hour", value: "lastHour" },
    { label: "Last Day", value: "lastDay" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
  ];


  // select data range to display from historical state
  const filterData = (e: any) => {
    console.log("radio checked", e.target.value);
    setTimeRange(serviceData[e.target.value])
  };

  const refreshData = () => {
    // axios.get('ec2instance'+'/getHistorical').then(function(response){
    //   console.log(response)
    //   setServiceData(response)
    // })
    // .catch(function(error){
    //   console.log(error,'< error')
    // })
  };

  if (!bool) {
    return (
      <div>
        <Spin
          style={{ fontSize: "25px" }}
          className="loading"
          size="large"
          tip="Loading..."
        ></Spin>
      </div>
    );
  } else {
    return (
      <div id="chartContainer">
        <AggregateStats
          error={aggregate.error}
          response_time={aggregate.response_time}
          load={aggregate.load}
          availability={aggregate.availability}
        />
        <Divider>
          <Title level={3}>Historical Status</Title>
        </Divider>
        <div className="rangeSelectorContainer">
          <CardDropDown services={serviceNames} />

          <Radio.Group
            style={{ marginLeft: "10px" }}
            optionType="button"
            onChange={filterData}
            options={options}
            defaultValue="lastHour"
          />

          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={refreshData}
          >
            Refresh Data
          </Button>
        </div>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Title level={5}>Availability</Title>
            <Card bordered={true} hoverable={true} style={{ width: "500px" }}>
              <Availability />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Latency</Title>
            <Card bordered={true} hoverable={true} style={{ width: "500px" }}>
              <Availability />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Title level={5}>Error Rate</Title>
            <Card bordered={true} hoverable={true} style={{ width: "500px" }}>
              <ErrorRate />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Load</Title>
            <Card bordered={true} hoverable={true} style={{ width: "500px" }}>
              <LoadChart />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export { ChartContainer };
