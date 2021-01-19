/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component, useContext, useEffect, useState } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
// import TabContainer from './TabContainer'
import { myContext } from '../contexts/globalContext';
import { AddService }  from './AddService'
import { Paper, Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';

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
      <Paper>
        <Grid container direction="column">
      <AddService />
      <br />
      <Switch>
        <Route exact path='/'>
          <div>
            <Link className="navbarButtons" to="/">
              <Button>Current Status</Button>
            </Link>
            < br/>
            <Link className="navbarButtons" to="/historical">
              <Button>Historical Status</Button>
            </Link>
            <br />
            <Link className="navbarButtons" to="/dependencies">
              <Button>Dependency Graph</Button>
            </Link>
          </div>
        </Route>

        <Route exact path="/" component={AddService} />
            <Route path="/historical" component={AddService} />
            <Route path="/dependency" component={AddService} />
        
      </Switch>
      </Grid>
      </Paper>
    </div>

)}

export { NavBar };