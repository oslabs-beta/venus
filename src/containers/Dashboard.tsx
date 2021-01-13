/**
 * @name Dashboard
 * @desc Right-hand side of the Main Display.  Dashboard that displays services and corresponding data.
 * The parent container for Aggregate Data, Service Container, and Chart Container.
 */

 import React from 'react';
//  import TabContainer from './TabContainer'
import ServiceContainer from './ServiceContainer';
import ChartContainer from './ChartContainer';

 export default class Dashboard extends React.Component {
    //  constructor(props) {
    //      super(props);
    //      this.state = {
    //      }
    //  }
     render() {
         return(
             <div>
             <ServiceContainer />



             <ChartContainer />

                 
             </div>
         )
     }
 }

 // exports to MainContainer
