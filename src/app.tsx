import React from 'react';
import ReactDom, { render } from 'react-dom';
import './style.scss';


// create an element "div"
// const mainElement = document.createElement('div');
// // append it to the DOM
// document.body.appendChild(mainElement);
class App extends React.Component {
  render() {
  return (
    <h1 className="app">
      Hi from a react
    </h1>
  )
  }
}

// ReactDom.render(<App />, mainElement);

//export file
export default App;
