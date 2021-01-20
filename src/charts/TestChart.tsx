import React, { useState , useEffect } from 'REACT' ;   


// import { Heatmap } from '@ant-design/charts' ;     

// function TestChart(): JSX.Element {      
//   const [data, setData] = useState([ ]);   
//   useEffect(() => {  
//     fetch('https://gw.alipayobjects.com/os/bmw-prod/67ef5751-b228-417c-810a-962f978af3e7.json')
//       .then((response) => response.json()) 
//       .then((json) => setData (json))  
//       .catch((error) => {  
//         console.log('Data failed FETCH', error);
//     });
//   }, []); 
//   var config = { 
//     width: 650, 
//     height: 500, 
//     autoFit: false, 
//     data,
//     xField: 'Month of Year', 
//     yField: 'District', 
//     colorField: 'AQHI', 
//     Color: [ '# 174c83', '# 7eb6d4', '#efefeb', '# efa759', '# 9b4d16' ],     
//     meta: {'Month of Year':{type : 'cat'}} ,       
//   };
//   return ( <Heatmap { ...config }/> );   
//};

// export { TestChart }; 