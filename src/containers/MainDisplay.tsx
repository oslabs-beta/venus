/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './Navbar';
import Dashboard from './Dashboard';

 export default class MainDisplay extends Component {
    //  constructor(props) {
    //      super(props);
    //      this.state = {
    //      }
    //  }
     render() {
         return(
             <div>
             <h1>Main Display</h1>
             <NavBar />
             <Dashboard />
             </div>
         )
     }
 }

//add any bindings here

//add any methods here

//add axios

