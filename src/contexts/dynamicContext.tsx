import React, { useState } from 'react'; 

// type dynamicState = {
//   services: {
//     host: string,
//     port: string,
//     path: string, 
//     date: string, // potentially an int TBD.
//     statusCode: number, 
//     latency: number, 
//   }[];
//   setServices: (input:any[]) => void;
// };


type dynamicState = {
  services: { 
    service: string,
    status: string,
    uptime: string,
    load: string,
    latency: string, 
    error: string,
  }[];
  setServices: (input:any[]) => void;
};

export const liveData: dynamicState= {
  services: [
    {
      service: 'Google Weather API',
      status: 'good',
      uptime: '98%',      
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Surfline API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Stripe API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Surfline API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Unemployment API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'AWS API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Codesmith API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
    {
      service: 'Plaid API',
      status: 'good',
      uptime: "98%",
      latency: '300ms',
      load: '1000hpm',
      error: '2%'
    },
  ],
  setServices: () => {}
};

export const dynamicContext = React.createContext<dynamicState>(liveData)

export const dynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);

return <dynamicContext.Provider value={{services, setServices}}>{props.children}</dynamicContext.Provider>

}