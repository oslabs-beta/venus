/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component, useContext, useEffect, useState } from 'react';
import TabContainer from './TabContainer'
import { myContext } from '../contexts/globalContext';

export default function  NavBar(): JSX.Element {
	const [will, setWill] = useState('')
	
	const { urls, setUrls } = useContext(myContext);
	let test = urls
	useEffect(() => {
		setUrls(['mike', 'evan'])
		setWill('will')
	}, []);

	const handlePress = () => {
		setUrls(['new', 'state'])

	}


	console.log(urls, "navbar")
  return(
		<div id="navBar">
			<TabContainer />
			<input type="button" onClick={handlePress}></input>
			<h1>{test}</h1>
			<h1>{will}</h1>
    </div>
  ) 
 }

 // exports to containers/MainContainer