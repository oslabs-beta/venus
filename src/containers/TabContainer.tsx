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
              <div style={{background: "lime", fontSize: "16px"}}>
              <h1>t4b C0Nt4iN3R tH4Ts H0Ld5 tH3 T4B</h1>
              <Tab />
              </div>
          ) 
      }
  }