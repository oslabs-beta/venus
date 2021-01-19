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
import Button from 'antd/es/button'

// import 'antd/dist/antd.less';


function  MainDisplay(): JSX.Element{
  const large: any = "large"; 
return(
    
  <Router>
    <Switch>
    <div id="mainDisplay">
      <div id="navBar">
            <div className="navButtonsContainer">
              <span>VENUS</span> 
              <br></br>
              <AddService />
              <br></br>
              <Link  to="/">
                <Button className="navbarButtons" block size={large}>Current Status</Button>
              </Link>
              <br></br>
              <Link to="/historicalData">
                <Button className="navbarButtons" block size={large}>Historical Status</Button>
              </Link>
              <br></br>
              <Link  to="/dependencyGraph">
                <Button className="navbarButtons" block size={large}>Dependency Graph</Button>
              </Link>
            </div>

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

