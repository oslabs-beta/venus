import React , { useState , useEffect } from 'REACT' ;    
import { OrganizationTreeGraph } from '@ant-design/charts' ;     

function DependencyTree(): JSX.Element {      
  const data = { 
    id : 'root' , 
    label : 'root' , 
    children : [ 
      {
        id : 'c1' , 
        label : 'c1' , 
        children : [ 
          {
            id : 'c1-1' , 
            label : 'c1-1' , 
          } ,
          {
            id : 'c1-2' , 
            label : 'c1-2' , 
            children : [ 
              {
                id : 'c1-2-1' , 
                label : 'c1-2-1' , 
              } ,
              {
                id : 'c1-2-2' , 
                label : 'c1-2-2' , 
              } ,
            ] ,
          } ,
        ] ,
      } ,
      {
        id : 'c2' , 
        label : 'c2' , 
      } ,
      {
        id : 'c3' , 
        label : 'c3' , 
        children : [ 
          {
            id : 'c3-1' , 
            label : 'c3-1' , 
          } ,
          {
            id : 'c3-2' , 
            label : 'c3-2' , 
            children : [ 
              {
                id : 'c3-2-1' , 
                label : 'c3-2-1' , 
              } ,
              {
                id : 'c3-2-2' , 
                label : 'c3-2-2' , 
              } ,
              {
                id : 'c3-2-3' , 
                label : 'c3-2-3' , 
              } ,
            ] ,
          } ,
          {
            id : 'c3-3' , 
            label : 'c3-3' , 
          } ,
        ] ,
      } ,
    ] ,
  } ;
  
  const nodeStateStyles = { 
    hover : { 
      stroke : '#1890ff' , 
      lineWidth : 2 , 
    } ,
    selected : { 
      stroke : '#f00' , 
      lineWidth : 3 , 
    } ,
  } ;
  const handleNodeClick = (item: any , graph:any ) => {     
    graph . setItemState ( item , 'selected' , true ) ;  
  } ;
  const handleCanvasClick = ( graph:any ) => {     
    const selectedEdges = graph . findAllByState ( 'edge' , 'selected' ) ; 
    selectedEdges . forEach ( ( edge:any ) => {  
      graph . setItemState ( edge , 'selected' , false ) ;  
    });
    const selectedNodes = graph . findAllByState ( 'node' , 'selected' ) ; 
    selectedNodes . forEach ( ( node:any ) => {  
      graph . setItemState ( node , 'selected' , false ) ;  
    });
  };
  return ( 
    < OrganizationTreeGraph
      data = {data}
      nodeType = "rect"
      nodeStateStyles = { nodeStateStyles }
      handleNodeClick = { handleNodeClick }
      handleCanvasClick = { handleCanvasClick }
      width={750}
      height={750}
    />
  );
};

export { DependencyTree };