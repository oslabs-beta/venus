/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down menu where user can select from available services. 
 *       Services are gathered from the dynamic context.  
**/

import React, { useContext, useEffect } from 'react'
import Select from 'antd/es/select';
import { historicalContext } from '../contexts/historicalContext';
import { dynamicContext } from '../contexts/dynamicContext';
import { globalContext } from '../contexts/globalContext';
import axios from "axios";

function CardDropDown (): JSX.Element{
  

  const { setService, setTimeRange, setServiceData, setAggregate, currentRange } = useContext(historicalContext)
  const { serverAddress } = useContext(globalContext)
  const { serviceNames } = useContext(dynamicContext)
  let aggregate: JSX.Element = <Select.Option value={'aggregate'} key={10000}>{'Aggregate'}</Select.Option>
  
  
  const dropDownOptions: any[] =[aggregate];
 
    for (let i = 0; i < serviceNames.length; i++){
      dropDownOptions.push(
      <Select.Option value={serviceNames[i]} key={i}>{serviceNames[i]}</Select.Option>
    )
  }

	function onChange(value:string) {
    console.log(value)
    axios.get(serverAddress +':3000/getHistorical/' + value)
    .then(function(response){
      setServiceData(response.data[currentRange]);
      setTimeRange(response.data);
      console.log(response.data[currentRange], 'get aggregate')
      setAggregate(response.data[currentRange].aggregate);
    })
    .catch(function(error){
      console.log(error,'< error')
    })
    setService(value)
  }
    
	function onSearch(val:any) {
		console.log('search:', val);
  }
  
  return (
  <Select
    style={{ width: 300}}
    placeholder="Select a service"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input:any, option:any) =>
       option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}> 
    {dropDownOptions}
  </Select>
  )
}

export { CardDropDown };






  