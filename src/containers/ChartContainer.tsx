/**
 * @name ChartContainer
 * @desc Child of Main Container container that holds and displays each Chart.
 */
import React, { useContext, useEffect, useState } from "react";
import { CardDropDown } from "../components/CardDropDown";
import { historicalContext } from "../contexts/historicalContext";
import { dynamicContext } from "../contexts/dynamicContext";
import { globalContext } from "../contexts/globalContext";
import { AggregateStats } from "../components/AggregateStats";
import { Availability } from "../charts/AvailabilityChart";
import { LoadChart } from "../charts/LoadChart";
import { ErrorRate } from "../charts/ErrorRate";
import { Latency } from "../charts/LatencyChart";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Card from "antd/es/card";
import { Spin } from "antd";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import Radio from "antd/es/radio";
import Button from "antd/es/button";
import axios from "axios";
function ChartContainer(): JSX.Element {
  const [bool, setBool] = useState(false);
  const {
    aggregate,
    setAggregate,
    service,
    setService,
    setServiceData,
    timeRange,
    setTimeRange,
    currentRange,
    setCurrentRange,
  } = useContext(historicalContext);
  const { serverAddress } = useContext(globalContext);
  const { serviceNames } = useContext(dynamicContext);
  const test: any = {
    status: 0,
    load: 12,
    response_time: 12,
    error: 12,
    availability: 12,
  };

  useEffect(() => {
    axios
      .get(serverAddress + ":3000/getHistorical/aggregate")
      .then(function (response) { 
        console.log(response.data)
        setServiceData(response.data.lastHour);
        setTimeRange(response.data);
        setService("aggregate");
        setAggregate(response.data.lastHour.aggregate);
      }).then(function(response){
        setBool(true);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }, []);

  // temporal options for chart displays
  const options = [
    { label: "Last Hour", value: "lastHour" },
    { label: "Last Day", value: "lastDay" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
  ];
  console.log(timeRange);

  // Radio Data selection function.
  const filterData = (e: any) => {
    console.log("radio checked", e.target.value);
    setServiceData(timeRange[e.target.value]);
    setCurrentRange(e.target.value);
  };
  console.log(currentRange, "currentRange");
  
  const refreshData = () => {
    if (service === ''){

    }
    axios.get(serverAddress + ':3000/getHistorical/' + service).then(function(response){
      console.log(response.data)
      setTimeRange(response.data)
      setServiceData(response.data[currentRange])
    })
    .catch(function(error){
      console.log(error)
    })
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
            <Title level={5}>Availability Rate (%)</Title>
            <Card bordered={true} hoverable={true} style={{ width: "700px" }}>
              <Availability />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Response Time (ms)</Title>
            <Card bordered={true} hoverable={true} style={{ width: "700px" }}>
              <Latency />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Title level={5}>Error Rate (%)</Title>
            <Card bordered={true} hoverable={true} style={{ width: "700px" }}>
              <ErrorRate />
            </Card>
          </Col>
          <Col span={12}>
            <Title level={5}>Load (hpm)</Title>
            <Card bordered={true} hoverable={true} style={{ width: "700px" }}>
              <LoadChart />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export { ChartContainer, Availability, LoadChart, Button, AggregateStats }