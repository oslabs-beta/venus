/**
 * @name NavBar
 * @desc Left-hand side of Main Display. Displays Navigation Bar
 */

import React, { Component, useContext, useEffect, useState } from 'react';
// import TabContainer from './TabContainer'
import { myContext } from '../contexts/globalContext';

export default function  NavBar(): JSX.Element {
	const [will, setWill] = useState('')
	
	const { urls, setUrls } = useContext(myContext);
	let test = urls
	useEffect(() => {
		setUrls(['mike', 'evan'])
		setWill('will')
	}, []);

	const handlePress = () => {
		setUrls(['new', 'state'])

	}


	console.log(urls, "navbar")
  return(
		<div id="navBar">
			{/* <TabContainer /> */}
			<input type="button" onClick={handlePress}></input>
			<h1>{test}</h1>
			<h1>{will}</h1>
    </div>
  ) 
 }

 // exports to containers/MainContainer

// // import Tab from '../components/Tab'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// export default function  NavBar(): JSX.Element {
//   return (
//     // React Router boilerplate code
//     <div className="container-fluid">
//       <Router>
//         <div className="row ml-3">
//           <ul className="list-inline">
//             <li className="customLink list-inline-item brand mr-3">VENUS NOIR beta™</li>
//             <li className="list-inline-item mr-3">
//               <Link className="customLink" to="/">
//                 REAL-TIME
//               </Link>
//             </li>
//             <li className="list-inline-item">
//               <Link className="customLink" to="/historical">
//                 HISTORICAL
//               </Link>
//             </li>
//             <li className="list-inline-item">
//               <Link className="customLink" to="/dependency">
//                 DEPENDENCIES
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="container">
//           <Switch>
//             <Route exact path="/" component={TabContainer} />
//             <Route path="/historical" component={TabContainer} />
//             <Route path="/dependency" component={TabContainer} />
//           </Switch>
//         </div>
//       </Router>
//     </div>
//   );
// }