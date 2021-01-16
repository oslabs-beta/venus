import React, {createContext, useState, useContext, ReactNode} from 'react'; 
import { IUrl } from '../type';

// define the array Typescript style
// interface iUrl {
//   [index: number]: string;
// }

// "interface" declares a completely "new" type
// by "new type" we mean "an object composed of a few types"
// interface IState {
//   // text: string,
//   urls: Array<string>,
//   // assign type to setUrls function
//   setUrls(): any
// };

// now that we have the types, declare the initial value
// I've also declared the type as our "IState" interface
// const initialState: IState = {
//   // text: '',
//   urls: [''],
//   setUrls: (url:string) => {},
// };

// instead of having the context be a single large object
// create pairs of value and update methods.
// return <myContext.Provider value={value, setValue}>{props.children}</myContext.Provider>
// in the case above value is a sample store (object int string) and setValue is a hook method 
// that allows for global manipulation of the value. 


// create a new context with initialState as our state and IState as our type
// export const myContext = React.createContext<IState>(initialState)

export const UrlContext = React.createContext(null);

// // return the provider part of the context we've created
// // make sure we have our props
// // declare the type as a JSX element
// // goal is to make sure the value gets passed down into components that are inside this context
// export function ContextProvider(props: any): JSX.Element {
//   // const [urls, setUrls] = useState<string>();
//   // const addUrl = (val:string) => {setUrls(urls = [...urls,val])}

//   return <myContext.Provider 
//     value={initialState}>
//       {props.children}
//     </myContext.Provider>
// }

export const ContextProvider: React.FC<React.ReactNode> = ({children}) => {
  const [urls, setUrls] = React.useState<IUrl[]>([
    {
      id: 1,
      name: "/google/spacerocks",
      description: "this is a description",
      status: false
    },
    {
      id: 2,
      name: "/darkwebbitcoinmine",
      description: "this is a description",
      status: true
    }
  ])

  const saveUrl = (url:IUrl) => {
    const newUrl: IUrl = {
      id: Math.random(),
      name: url.name,
      description: url.description,
      status: false
    };
    setUrls([...urls, newUrl]);
  }

  const updateUrl = (id: number) => {
    urls.filter((url: IUrl) => {
      if (url.id === id) {
        url.status = true;
        setUrls([...urls]);
      }
    });
  };

  return (
    <UrlContext.Provider value={{ urls, saveUrl, updateUrl }}>
      {children}
    </UrlContext.Provider>
  );
}


