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


export const ContextProvider: React.FC = (props: any) => {
  
  const [urls, setUrls] = useState<string[]>([]);


}
