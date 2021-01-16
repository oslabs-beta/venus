/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useState } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './Navbar';
import Dashboard from './Dashboard';

export default function  MainDisplay(): JSX.Element{
  const [urls, setUrls] = useState<string>();
  const addUrl = (val:string) => {setUrls(urls = [...urls,val])}
  
return(
    <div id="mainDisplay">
    <NavBar />
    <Dashboard />
    </div>
  )
}

//add any bindings here

//add any methods here

//add axios

