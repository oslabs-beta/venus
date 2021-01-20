import React, { useState } from 'react'; 

export type AppState = {
  urls: string[];
  setUrls: (urls: string[]) => void;
};

export const initialState: AppState = {
  urls: [],
  setUrls: () => {}
};

export const myContext = React.createContext<AppState>(initialState)


// create a new context with initialState as our state and IState as our type
// export const myContext = React.createContext<IState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [urls, setUrls] = useState<string[]>([]);

  return <myContext.Provider value={{urls, setUrls}}>{props.children}</myContext.Provider>

}


