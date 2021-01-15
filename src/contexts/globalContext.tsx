import React, {createContext, useState, useContext, ReactNode} from 'react'; 

// "interface" declares a completely "new" type
// by "new type" we mean "an object composed of a few types"
interface IState {
  text: string,
  urls: []
}

// now that we have the types, declare the initial value
// I've also declared the type as our "IState" interface
const initialState: IState = {
  text: '',
  urls: []
}

// create a new context with initialState as our state and IState as our type
export const myContext = React.createContext<IState>(initialState)

// return the provider part of the context we've created
// make sure we have our props
// declare the type as a JSX element
// goal is to make sure the value gets passed down into components that are inside this context
export function ContextProvider(props: any): JSX.Element {
  return <myContext.Provider value={initialState}>{props.children}</myContext.Provider>
}
