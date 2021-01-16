/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component } from 'react';
import TabContainer from './TabContainer'

export default function  NavBar(): JSX.Element {
  return(
		<div id="navBar">
			<TabContainer />
    </div>
  ) 
 }

 // exports to containers/MainContainer