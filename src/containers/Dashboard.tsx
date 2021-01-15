/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

 import React, {useContext} from 'react';
//  import TabContainer from './TabContainer'
import ServiceContainer from './ServiceContainer';
import ChartContainer from './ChartContainer';
import AggregateStats from '../components/AggregateStats';
import {myContext} from '../contexts/globalContext'

export default function  Dashboard(): JSX.Element{
    
    const {urls} = useContext(myContext)
    console.log(urls, "dashboard")

         return(
             <div id="dashboard">
                <h1>This is the dashboard</h1>
                
                <AggregateStats />
                <ServiceContainer />
                <h1>{urls}</h1>
                <ChartContainer />
             </div>
         )
 }
 // exports to MainContainer
