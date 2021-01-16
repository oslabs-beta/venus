/**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart 
 */


import React from 'react';
import { CardDropDown } from '../components/CardDropDown'
import { Chart } from '../components/Chart'
//import service card container
//import chart container

function ChartContainer(): JSX.Element {
	return(
		<div id="chartContainer">
			<h1>This is the Chart Container</h1>
			<Chart />
			<CardDropDown />
		</div>
	)
}

export { ChartContainer };
