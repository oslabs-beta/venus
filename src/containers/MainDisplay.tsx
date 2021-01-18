/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavBar } from './Navbar';
import { Dashboard } from './Dashboard';
import { myContext } from "../contexts/globalContext"
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../dashboardTheme";

function  MainDisplay(): JSX.Element{


return(
    <div id="mainDisplay">
    <NavBar />
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
    </div>
  )
}


export { MainDisplay }

