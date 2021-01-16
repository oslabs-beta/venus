import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react'; 

// define the array Typescript style
// interface iUrl {
//   [index: number]: string;
// }

// "interface" declares a completely "new" type
// by "new type" we mean "an object composed of a few types"
interface IState {
  // text: string,
  urls: any[],
  // assign type to setUrls function
  setUrls: () => void,
};


// now that we have the types, declare the initial value
// I've also declared the type as our "IState" interface
const initialState: IState = {
  // text: '',
  urls: ['hello'],
  setUrls: () => {},
};

// instead of having the context be a single large object
// create pairs of value and update methods.
// return <myContext.Provider value={value, setValue}>{props.children}</myContext.Provider>
// in the case above value is a sample store (object int string) and setValue is a hook method 
// that allows for global manipulation of the value. 

// create a new context with initialState as our state and IState as our type
export const myContext = React.createContext<IState>(initialState)

// return the provider part of the context we've created
// make sure we have our props
// declare the type as a JSX element
// goal is to make sure the value gets passed down into components that are inside this context
export const ContextProvider: React.FC = (props: any) => {
  
  return <myContext.Provider value={initialState}>{props.children}</myContext.Provider>

  

}
