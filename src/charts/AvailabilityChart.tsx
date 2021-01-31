
import React, { useState, useEffect } from 'react';
import Line from'@ant-design/charts/es/line';     
const Availability: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => { 
        console.log(json)
        return setData(json)})
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data ,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    yAxis : { 
      label: {
        formatter: function formatter(v:any) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
  };
  return <Line {...config} />;
};
export { Availability } ;  
