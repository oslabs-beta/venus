/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

 import React, {useContext, useEffect} from 'react';
//  import TabContainer from './TabContainer'
import  { ServiceContainer } from './ServiceContainer';
import { AggregateStats } from '../components/AggregateStats';
import { initialState, myContext, AppState } from '../contexts/globalContext';
import { Divider } from 'antd';

function  Dashboard(): JSX.Element{
    return(
      <div id="dashboard">          
        <AggregateStats />
        <Divider></Divider>
        <ServiceContainer/>
      </div>
  )
 };

 export { Dashboard };
 // exports to MainContainer
