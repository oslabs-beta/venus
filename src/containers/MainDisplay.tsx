/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { AddService } from './AddService';
import { ChartContainer } from './ChartContainer';
import { DependencyGraph } from './DependencyGraph'
import { Button, Menu } from 'antd'

function  MainDisplay(): JSX.Element{
return(
    
  <Router>
    <Switch>
    <div id="mainDisplay">
      <div id="navBar">
            <div>
              <Link className="navbarButtons" to="/">
                <Button>Current Status</Button>
              </Link>
              <Link className="navbarButtons" to="/historicalData">
                <Button>Historical Status</Button>
              </Link>
              <Link className="navbarButtons" to="/dependencyGraph">
                <Button>Dependency Graph</Button>
              </Link>
            </div>
            
            <AddService />
            <Route path="/" exact component={Dashboard}/>
            <Route path="/historicalData" component={ChartContainer}/>
            <Route path="/dependencyGraph" component={DependencyGraph}/>
      </div>
    </div>
    </Switch>
  </Router>


  )
}





export { MainDisplay }

