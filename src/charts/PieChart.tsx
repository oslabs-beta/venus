import React, { useState , useEffect } from 'react' ;    
import Pie  from '@ant-design/charts/es/pie' ;    


function PieChart(): JSX.Element {      
  // const { registerTheme } = G2 ;   
  // registerTheme ( 'custom-theme' , { 
  //   colors10 : [ '#FACDAA' , '#F4A49E' , '#EE7B91' , '#E85285' , '#BE408C' , '#BE408C' ] ,      
  //   colors20 : [ '#FACDAA' , '#F4A49E' , '#EE7B91' , '#E85285' , '#BE408C' , '#BE408C' , '#942D93' ] ,       
  // } ) ;
  const data:any = [ 
    {
      type : 'Classification One' , 
      value : 27 , 
    } ,
    {
      type : 'Class 2' , 
      value : 25 , 
    } ,
    {
      type : 'Classification Three' , 
      value : 18 , 
    } ,
    {
      type : 'Classification Four' , 
      value : 15 , 
    } ,
    {
      type : 'Classification Five' , 
      value : 10 , 
    } ,
    {
      type : 'Other' , 
      value : 5 , 
    } ,
  ] ;
  const config = { 
    appendPadding : 10 , 
    data ,
    angleField : 'value' , 
    colorField : 'type' , 
    radius : 0.8 , 
    label : { } , 
    interactions : [ { type : 'element-active' } ] ,    
    theme : 'custom-theme' , 
  } ;
  return < Pie { ... config } /> ;   
} ;
export default PieChart ;  