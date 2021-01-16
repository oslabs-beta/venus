/**
 * @name ServiceContainer
 * @desc Child of Dashboard.jsx, Parent container that holds and displays each Service Card
 */

import { ServiceCard } from '../components/ServiceCard'
import React from 'react';
//  import TabContainer from './TabContainer'

function ServiceContainer(): JSX.Element{
	return(
			<div id="serviceContainer">
				<h1>Service Container</h1>
				<ServiceCard />
			</div>
	)
 }

 // exports to Dashboard
 export { ServiceContainer };
