import React, { useState } from 'react'; 

export type AppState = {
  verification: boolean;
  setVerification: (verfied:boolean ) => void;
};

export const initialState: AppState = {
  verification: false,
  setVerification: () => {}
};

export const myContext = React.createContext<AppState>(initialState)


// create a new context with initialState as our state and IState as our type
// export const myContext = React.createContext<IState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [verification, setVerification] = useState<boolean>(false);

  return <myContext.Provider value={{verification, setVerification}}>{props.children}</myContext.Provider>

}


