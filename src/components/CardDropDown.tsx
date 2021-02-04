/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down menu where user can select from available services
**/

import React, { useContext, useEffect } from 'react'
import Select from 'antd/es/select';
import { historicalContext } from '../contexts/historicalContext';
import { dynamicContext } from '../contexts/dynamicContext';


function CardDropDown (props:any): JSX.Element{
  
  let aggregate: JSX.Element = <Select.Option value={'aggregate'} key={10000}>{'Aggregate'}</Select.Option>
  const dropDownOptions: any[] =[aggregate];
  for (let i = 0; i < props.services.length; i++){
    dropDownOptions.push(
      <Select.Option value={props.services[i]} key={i}>{props.services[i]}</Select.Option>
    )
  }
  const { setService, setTimeRange, currentRange } = useContext(historicalContext)
	function onChange(value:string) {
    console.log(value)
    // axios.get('ec2instance'+':3000/getHistorical/' + value).then(function(response){
    //   console.log(response)
    //   setServiceData(response.data[currentRange])
    //  setTimeRange(response.data)
    // })
    // .catch(function(error){
    //   console.log(error,'< error')
    // })
    // fetch request to route for data.
    // data is then brought into state and updated. otherwise, create a larger pool for an initial pull
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






  