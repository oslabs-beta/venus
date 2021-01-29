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
    byMethod: any
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
  filter: any,
  
  setServices: (input:any[]) => void;
  setAggregate: (input:any) => void;
  setDependencyGraph: (input:any) => void;
  setFilter: (input:any) => void;

};

export const liveData: dynamicState = {
  services: [
    {
      status: 'good',
      service: 'curriculum-api.codesmith.io',
      load: '0.6666666865348816hpm',
      response_time: 1266,
      error: 50,
      availability: 100,
      byMethod: {},
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
  filter: {},
  setServices: () => {},
  setAggregate: () => {},
  setDependencyGraph: () => {},
  setFilter:() => {},
};

export const dynamicContext = React.createContext<dynamicState>(liveData)

export const DynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);
  const [aggregate, setAggregate] = useState<any>({});
  const [dependencyGraph, setDependencyGraph ] = useState<any>({});
  const [filter, setFilter] = useState<any>({})

return <dynamicContext.Provider value={{services, setServices, aggregate, setAggregate, dependencyGraph, setDependencyGraph, filter, setFilter}}>{props.children}</dynamicContext.Provider>

}