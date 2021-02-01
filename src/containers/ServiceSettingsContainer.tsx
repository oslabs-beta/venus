/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

import React, { useContext, } from "react";
//  import TabContainer from './TabContainer'
import { AggregateStats } from "../components/AggregateStats";
import { dynamicContext } from "../contexts/dynamicContext";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { EditableTable2 } from '../components/EditableTable'

function SettingsContainer(): JSX.Element {
  const { services, setServices, aggregate, setAggregate } = useContext(dynamicContext);

  return (
    <div id="dashboard">
      <AggregateStats
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
      />
      <Divider>
        <Title level={3}>Service Threshold Settings</Title>
      </Divider>
      <EditableTable2 />
    </div>
  );
}

export { SettingsContainer };
