import React, { useState } from 'react'; 

type dynamicState = {
  services: {
    host: string,
    port: string,
    path: string, 
    date: string, // potentially an int TBD.
    statusCode: number, 
    latency: number, 
  }[];
  setServices: (input:any[]) => void;
};
export const liveData: dynamicState= {
  services: [],
  setServices: () => {}
};

export const dynamicContext = React.createContext<dynamicState>(liveData)


export const dynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);

  return <dynamicContext.Provider value={{services, setServices}}>{props.children}</dynamicContext.Provider>

}