import React, {createContext, useState, useContext} from 'react'; 
import React, { ReactNode } from 'react';
// const [loggedIn, setLogin] = useState(false);

const myContext = React.createContext<ContextValue>(undefined)

// regular contextApi
// const myContext = React.createContext({
//   url: {},
//   setUrl: () => {}
// });

export type Props = {
    children: ReactNode;
    axiosInstance: AxiosInstance;
  };
//  what is the type of value that the state will become
  export type ProviderValue = AxiosInstance; // since you know this is what the provider will be passing
// what is the default value of the state
  export type DefaultValue = undefined;
  // what types can the context be
  export type ContextValue = DefaultValue | ProviderValue;

// const myContext = React.createContext(null);

export default myContext; 