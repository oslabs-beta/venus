/**
 * @name ServiceSettingsContainer
 * @desc Displays service threshold settings where user can customize display based on threshold parameters
 * Parent Container to aggregate stats displayed on top of page.
 */

import React, { useContext, } from "react";
//  import TabContainer from './TabContainer'
import { AggregateStats } from "../components/AggregateStats";
import { dynamicContext } from "../contexts/dynamicContext";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { EditableTable } from '../components/EditableTable'

function SettingsContainer(): JSX.Element {
  const { services, setServices, aggregate, setAggregate } = useContext(dynamicContext);

  return (
    <div id="chartContainer">
      <AggregateStats
        error={aggregate.error}
        response_time={aggregate.response_time}
        load={aggregate.load}
        availability={aggregate.availability}
      />
      <Divider>
        <Title level={3}>Service Threshold Settings</Title>
      </Divider>
      <EditableTable />
    </div>
  );
}

export { SettingsContainer };
