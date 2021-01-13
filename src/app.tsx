import React from 'react';
import ReactDom, { render } from 'react-dom';
import './style.scss';
// import Main Display
import MainDisplay from './containers/MainDisplay'


// create an element "div"
const mainElement = document.createElement('div');
// append div to root index.html
document.body.appendChild(mainElement);

const App = () => {
  return (
    <div>
    <h1 className="app">Hi from a react: app.tsx</h1>
    <MainDisplay />
    </div>
  )
}


ReactDom.render(<App />, mainElement);
