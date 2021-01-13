import React from 'react';
import ReactDom from 'react-dom';
import './style.scss';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <h1 className="app">
      Hi from a react
    </h1>
  )
}

ReactDom.render(<App />, mainElement);
