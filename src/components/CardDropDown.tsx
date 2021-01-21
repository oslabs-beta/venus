/**
 * @name CardDropDown
 * @desc Child of ChartContainer, Displays drop down on 2nd page
**/

import React from 'react'
import Select from 'antd/es/select';

function CardDropDown (): JSX.Element{

  const { Option } = Select;

	function onChange(value:any) {
		console.log(`selected ${value}`);
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
    style={{ width: 300}}
    placeholder="Select a service"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input:any, option:any) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
    <Option value="GoogleWeather">Google Weather API</Option>
    <Option value="surfline">Surfline API</Option>
    <Option value="codesmith">Codesmith API</Option>
  </Select>
  )
}

export { CardDropDown };






  