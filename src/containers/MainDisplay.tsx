/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext, useState } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavBar } from './Navbar';
import { Dashboard } from './Dashboard';
import { myContext } from "../contexts/globalContext"
import { green, purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import {Paper, Grid, Box} from "@material-ui/core";
// import{} from "@material-ui/icons"
import theme  from "../dashboardTheme";

function  MainDisplay(): JSX.Element{

  // const [ theme, setTheme ] = useState<any>(true)
  // const appliedTheme = createMuiTheme(theme ? light : dark)
  
return(
    <div id="mainDisplay">
    {/* <ThemeProvider theme={theme}> */}
      {/* <Paper variant='outlined' elevation={3}>

        <Grid container direction="row" > */}
      <NavBar />
      <Dashboard />
      {/* </Grid>

      </Paper> */}
    {/* </ThemeProvider> */}
    </div>
  )
}


export { MainDisplay }

