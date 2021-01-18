/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavBar } from './Navbar';
import Dashboard from './Dashboard';
import { myContext } from "../contexts/globalContext"
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../dashboardTheme";

export default function  MainDisplay(): JSX.Element{

  const { urls } = useContext(myContext);
  console.log(urls, "MainDisplay")
return(
    <div id="mainDisplay">
    <NavBar />
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
    </div>
  )
}

//add any bindings here

//add any methods here

//add axios

