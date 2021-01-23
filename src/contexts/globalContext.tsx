import React, { useState } from 'react'; 

export type AppState = {
  verification: boolean;
  setVerfication: (verfied:boolean ) => void;
};

export const initialState: AppState = {
  verification: false,
  setVerfication: () => {}
};

export const myContext = React.createContext<AppState>(initialState)


// create a new context with initialState as our state and IState as our type
// export const myContext = React.createContext<IState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [verification, setVerfication] = useState<boolean>(false);

  return <myContext.Provider value={{verification, setVerfication}}>{props.children}</myContext.Provider>

}


