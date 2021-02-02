/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down on 2nd page
**/

import React, { useContext, useEffect } from 'react'
import Select from 'antd/es/select';
import { historicalContext } from '../contexts/historicalContext';
import { dynamicContext } from '../contexts/dynamicContext';


function CardDropDown (props:any): JSX.Element{
  
  let holder: string = 'aggregate'
  const { serviceNames } = useContext(dynamicContext)
  const dropDownOptions: any[] =[];
  for (let i = 0; i < serviceNames.length; i++){
    dropDownOptions.push(
      <Select.Option value={props.services[i]} key={i}>{serviceNames[i]}</Select.Option>
    )
  }
  const { setService } = useContext(historicalContext)
	function onChange(value:string) {
    console.log(value)
    // fetch request to route for data.
    // data is then brought into state and updated. otherwise, create a larger pool for an initial pull
    setService(value)
    }
    
	function onSearch(val:any) {
		console.log('search:', val);
  }
  
  return (
  <Select
    showSearch
    style={{ width: 300}}
    placeholder="Select a service"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input:any, option:any) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}> 
    {dropDownOptions}
  </Select>
  )
}

export { CardDropDown };






  