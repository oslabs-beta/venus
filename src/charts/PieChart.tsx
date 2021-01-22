import React, { useState , useEffect,useContext } from 'react' ;    
import Pie  from '@ant-design/charts/es/pie' ;    
import { liveData, historicalContext} from '../contexts/historicalContext' ;  
// import liveData from "../contexts/historicalContext";

function PieChart(): any {      
  // const { registerTheme } = G2 ;   
  // registerTheme ( 'custom-theme' , { 
  //   colors10 : [ '#FACDAA' , '#F4A49E' , '#EE7B91' , '#E85285' , '#BE408C' , '#BE408C' ] ,      
  //   colors20 : [ '#FACDAA' , '#F4A49E' , '#EE7B91' , '#E85285' , '#BE408C' , '#BE408C' , '#942D93' ] ,       
  // } ) ;
  console.log('hitting the pie chart', liveData.historical) 
  const data: any = liveData.historical

  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'latency',
    colorField: 'uptime',
    radius: 0.8,
    label: {
      uptime: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ uptime: 'pie-legend-active' }, { uptime: 'element-active' }],
  };
  return <Pie {...config} />;
};

export default PieChart ;  