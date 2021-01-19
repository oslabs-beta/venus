/**
 * @name ChartContainer
 * @desc Child of Dashboard, Parent container that holds and displays each Chart 
 */


import React from 'react';
import { CardDropDown } from '../components/CardDropDown'
import { Chart } from '../components/Chart'
import { ChartRender } from '../components/ChartRender'

//import service card container
//import chart container

function ChartContainer(): JSX.Element {
	return(
		<div id="chartContainer">
			<h1>See Your Charts</h1>
			<CardDropDown />
			<ChartRender />
		</div>
	)
}

export { ChartContainer };
