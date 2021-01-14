/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component } from 'react';
import TabContainer from './TabContainer'

export default class NavBar extends Component {
    //  constructor(props) {
    //      super(props);
    //      this.state = {
    //      }
    //  }
     render() {
         return(
             <div style={{background: "green", fontSize: "20px"}}>
             <h1>Nav Bar</h1>
             <TabContainer />
             </div>
         ) 
     }
 }

 // exports to containers/MainContainer