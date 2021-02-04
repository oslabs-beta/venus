/**
 * @name globalContext
 * @desc Context container that, when updated with the right credentials, allows user to access app
 */
import React, { useState } from 'react'; 

export type GlobalState = {
  verification: boolean;
  serverAddress: string;
  token: string;
  setVerification: (verfied:boolean ) => void;
  setServerAddress: (address:string ) => void;
  setToken: (token: string) => void;
};

export const initialState: GlobalState = {
  verification: false,
  serverAddress: '',
  token: '',
  setVerification: () => {},
  setServerAddress: () => {},
  setToken: () => {},
};

export const globalContext = React.createContext<GlobalState>(initialState)


// create a new context with initialState as our state and IState as our type
// export const myContext = React.createContext<IState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [verification, setVerification] = useState<boolean>(false);
  const [serverAddress, setServerAddress] = useState<string>('ec2-3-15-29-241.us-east-2.compute.amazonaws.com:8080');
  const [token, setToken] = useState<string>('fake token');

  return <globalContext.Provider value={{verification, setVerification, serverAddress, setServerAddress, token, setToken}}>{props.children}</globalContext.Provider>

}


