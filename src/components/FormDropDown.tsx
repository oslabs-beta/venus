/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down on 2nd page
**/

import React, { useContext } from 'react'
import Select from 'antd/es/select';
import { dynamicContext } from '../contexts/dynamicContext';

function FormDropDown (props:any): JSX.Element{
  let methods: string[] = Object.keys(props.record.byMethod)
    const dropDownOptions: any[] =[<Select.Option value={'ALL METHODS'} key={10000}>{'ALL METHODS'}</Select.Option>];
    for (let i = 0; i < methods.length; i++){
    dropDownOptions.push(
      <Select.Option value={methods[i]} key={i}>{methods[i]}</Select.Option>
    )
  }
  const { filter, setFilter } = useContext(dynamicContext)
  
	function onChange(value:string ) {
    if (value === 'ALL METHODS' && filter[props.record.service]){
      delete filter[props.record.service]
      setFilter(filter)
      console.log(filter)
    } else {
    filter[props.record.service] = value
    setFilter(filter)
    console.log(filter)
    }
	}

	function onBlur() {
		console.log('blur');
	}

	function onFocus() {
  	console.log('focus');
	}

	function onSearch(val:any) {
		console.log('search:', val);
	}

  return (
  <Select
    showSearch
    style={{ width: 120}}
    placeholder="All Methods"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input:any, option:any) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}> 
    {dropDownOptions}
  </Select>
  )
}

export { FormDropDown };






  