/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component, useContext, useEffect, useState } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
// import TabContainer from './TabContainer'
import { myContext } from '../contexts/globalContext';
import  TabContainer  from './TabContainer'


function NavBar(): JSX.Element {
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

  return(
		<div id="navBar">
		 	<input type="button" onClick={handlePress}></input>
		 	<h1>{test}</h1>
		 	<h1>{will}</h1>
      <TabContainer />
 
<Switch>
  <Route exact path='/'>
    <div>
      <Link className="navbarButtons" to="/">
        <button>RealTimeMatrixShit</button>
      </Link>
      <Link className="navbarButtons" to="/historical">
        <button>HistoricalAssShit</button>
      </Link>
      <Link className="navbarButtons" to="/dependencies">
        <button>Dependencies</button>
      </Link>
    </div>
  </Route>

  <Route exact path="/" component={TabContainer} />
      <Route path="/historical" component={TabContainer} />
      <Route path="/dependency" component={TabContainer} />
  
</Switch>
</div>

)}

export { NavBar };