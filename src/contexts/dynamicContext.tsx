import React, { useState } from 'react'; 

type dynamicState = {
  services: { 
    status: string,
    service: string,
    load: string,
    response_time: number, 
    error: number,
   availability: number,
   key?: number,
  }[],
  aggregate: {
    status: string,
    load: string,
    response_time: number, 
    error: number,
    availability: number,
  };
  dependencyGraph: {
    service: string,
    status: string,
    children: any[]
  };
  setServices: (input:any[]) => void;
  setAggregate: (input:any) => void;
  setDependencyGraph: (input:any) => void
};

export const liveData: dynamicState = {
  services: [
    {
      status: 'good',
      service: 'curriculum-api.codesmith.io',
      load: '0.6666666865348816hpm',
      response_time: 1266,
      error: 50,
      availability: 100
    },
    {
      status: 'good',
      service: 'finance.yahoo.com',
      load: '0.6666666865348816hpm',
      response_time: 1417.5,
      error: 50,
      availability: 100
    },
    {
      status: 'good',
      service: 'weather.google.com',
      load: '0.6666666865348816hpm',
      response_time: 1150,
      error: 0,
      availability: 50
    }
  ],
  aggregate: {
    error: 40,
    response_time: 1278,
    load: '2hpm',
    availability: 83,
    status: 'good'
  },
  dependencyGraph: {
    service: "CodeSmith",
    status: "good",
    children: [
      {
        service: "Google API",
        status: "good",
        methods:[
          { service: "GET",
          status: "bad"},
          { service: "POST",
          status: "good" },
          { service: "PUT",
          status: "fair" },
          { service: "DEL",
          status: "good" },
          ]
      }]
  },
  setServices: () => {},
  setAggregate: () => {},
  setDependencyGraph: () => {}
};

export const dynamicContext = React.createContext<dynamicState>(liveData)

export const DynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);
  const [aggregate, setAggregate] = useState<any>({});
  const [dependencyGraph, setDependencyGraph ] = useState<any>({});

return <dynamicContext.Provider value={{services, setServices, aggregate, setAggregate, dependencyGraph, setDependencyGraph}}>{props.children}</dynamicContext.Provider>

}