import React from 'react';
import ReactDom, { render } from 'react-dom';
import './style.scss';
// import Main Display
import MainDisplay from './containers/MainDisplay'
// make sure we can use our state and pass it into our main component
import {ContextProvider} from './contexts/globalContext'
import {myContext} from './contexts/globalContext'

// create an element "div"
const mainElement = document.createElement('div');
// append div to root index.html
document.body.appendChild(mainElement);


// Fragments let you group a list of children without adding extra nodes to the DOM
export default function App(): JSX.Element {
  // pass our state into App
  // const { text } = React.useContext(myContext)
  return (
    <React.Fragment>

      {/* <div>will</div> */}
    <h1 className="app">Hi this is a react: app.tsx</h1>
    <MainDisplay />
    </React.Fragment>
  )
}

// make sure we can use our state in App
ReactDom.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
   mainElement);
