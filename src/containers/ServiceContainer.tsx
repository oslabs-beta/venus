/**
 * @name ServiceContainer
 * @desc Child of Dashboard.jsx, Parent container that holds and displays each Service Card
 */

import { ServiceCard } from '../components/ServiceCard'
import React from 'react';
//  import TabContainer from './TabContainer'
import { Card } from '@material-ui/core';

const services: any = [
{
	name: 'Google Weather',
	latency: '223ms',
	uptime: '92%',
	load: '1000/m',
	error: '2.712%',
	color: "red"

},
{
	name: 'Apple Maps',
	latency: '123ms',
	uptime: '97%',
	load: '1022/m',
	error: '9.912%',
	color: "orange"
},
{
	name: 'Solar Wind API',
	latency: '103ms',
	uptime: '99%',
	load: '122/m',
	error: '16.928%',
	color: "green"
}
]

const data: any = [];

for (let i = 0; i < services.length; i++){
	data.push(<ServiceCard {...services[i]}/>)
}

function ServiceContainer(): JSX.Element{
	return(
			<div id="serviceContainer">
				{data}
			</div>
	)
 }

 // exports to Dashboard
 export { ServiceContainer };
