/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component, useContext, useEffect, useState } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
// import TabContainer from './TabContainer'
import { myContext } from '../contexts/globalContext';
import { AddService }  from './AddService'


function NavBar(): JSX.Element {
	// const [will, setWill] = useState('')
	
	const { urls, setUrls } = useContext(myContext);
	let test = urls
	useEffect(() => {
		setUrls([])
		// setWill('will')
	}, []);

	const handlePress = () => {
		setUrls(['new', 'state'])

	}

  return(
		<div id="navBar">
      <Switch>
        <Route exact path='/'>
          <div>
            <Link className="navbarButtons" to="/">
              <button>Current Status</button>
            </Link>
            <Link className="navbarButtons" to="/historical">
              <button>Historical Status</button>
            </Link>
            <Link className="navbarButtons" to="/dependencies">
              <button>Dependency Graph</button>
            </Link>
          </div>
        </Route>

        <Route exact path="/" component={AddService} />
            <Route path="/historical" component={AddService} />
            <Route path="/dependency" component={AddService} />
        
      </Switch>

      <AddService />
    </div>

)}

export { NavBar };