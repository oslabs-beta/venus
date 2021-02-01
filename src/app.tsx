import React, { useState, useEffect } from 'react';
import ReactDom, { render } from 'react-dom';
import './style.scss';
import { MainDisplay } from './containers/MainDisplay'
import { ContextProvider } from './contexts/globalContext'
// import SignInContainer from './containers/SignInContainer'
import { BrowserRouter  } from 'react-router-dom';

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([])
  useEffect(() => {
    setUrls(['evan']);
  }, [])

  return (
    <div>
      <ContextProvider>
        <MainDisplay/>
      </ContextProvider>
    </div>
  )
}

// create an element "div"
const mainElement = document.createElement('div');
// append div to root index.html
document.body.appendChild(mainElement);
// make sure we can use our state in App
ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, mainElement);


export { App };