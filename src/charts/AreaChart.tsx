import React ,{ useState, useEffect } from'react';    
import Area from '@ant-design/charts/es/area';
function AreaChart(): JSX.Element {
  const[data, setData]=useState([]);   
  useEffect(()=>{  
    fetch('https://gw.alipayobjects.com/os/bmw-prod/67ef5751-b228-417c-810a-962f978af3e7.json')
      .then((response)=> response.json()) 
      .then((json)=>{
        console.log(json)
        return setData(json)})  
      .catch((error)=>{  
        console.log('fetch data failed', error);
      })
  },[]); 
  ;
  var config = { 
    data,
    xField:'year', 
    yField:'value', 
    seriesField: 'country',
    color: ['#82d1de', '#cb302d', '#e3ca8c'],
    areaStyle: { fillOpacity: 0.7 },
    appendPadding: 10,
    isPercent: true,
    yAxis : { 
      label:{ 
        formatter: function formatter(value:any) {
          return value * 100;
        },
      },
    },
  };
  return <Area {...config} />;
};
export { AreaChart };