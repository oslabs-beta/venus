/**
 * @name ServiceContainer
 * @desc Child of Dashboard.jsx, Parent container that holds and displays each Service Card
 */

import { ServiceCard } from '../components/ServiceCard'
import React from 'react';
//  import TabContainer from './TabContainer'

const services: any = {
	
}



function ServiceContainer(): JSX.Element{
	return(
			<div id="serviceContainer">
				<ServiceCard />
			</div>
	)
 }

 // exports to Dashboard
 export { ServiceContainer };
