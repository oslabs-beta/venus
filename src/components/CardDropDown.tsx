/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down on 2nd page
**/

import React, { useContext } from 'react'
import Select from 'antd/es/select';
import { historicalContext } from '../contexts/historicalContext';

// const options: any[] = [
//   'curriculum-api.codesmith.io', 'google.com', 'surfline.com'
// ];

function CardDropDown (props:any): JSX.Element{
  
  const dropDownOptions: any[] =[];
  for (let i = 0; i < props.services.length; i++){
    dropDownOptions.push(
      <Select.Option value={props.services[i]} key={i}>{props.services[i]}</Select.Option>
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






  