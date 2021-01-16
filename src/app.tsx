import React, { useState, useEffect } from 'react';
import ReactDom, { render } from 'react-dom';
import './style.scss';
// import Main Display
import MainDisplay from './containers/MainDisplay'
// make sure we can use our state and pass it into our main component
import { ContextProvider } from './contexts/globalContext'
import { myContext, AppState } from './contexts/globalContext'
import Container from '@material-ui/core/Container';




const App: React.FC = () => {
  // const [state, updateState] = useState<AppState>(myContext)
  const [urls, updateUrls] = useState<string[]>([])

 useEffect(() => {
  updateUrls(["a", "b"]);
  console.log(urls)
 }, []) 

 
  return (
    <div>
      <ContextProvider>
        <Container>
          <MainDisplay />
        </Container>
      </ContextProvider>
    </div>
  )
}

// create an element "div"
const mainElement = document.createElement('div');
// append div to root index.html
document.body.appendChild(mainElement);
// make sure we can use our state in App
ReactDom.render(<App />, mainElement);


