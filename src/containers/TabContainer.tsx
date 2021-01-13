/**
 * @name TabContainer
 * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
 */

 import React from 'react';
 import Tab from '../components/Tab'

 export default class TabContainer extends React.Component {
     //  constructor(props) {
     //      super(props);
     //      this.state = {
     //      }
     //  }
      render() {
          return(
              <div>
              <h1>Nav Bar</h1>
              <Tab />
              </div>
          ) 
      }
  }