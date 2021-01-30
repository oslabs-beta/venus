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
  serviceThresholds: {
    service: string,
    availability_threshold?: number,
    response_time_threshold?: number,
    load_threshold?: number,
    error_threshold?: number, 
    key?: number
  }[]
  
  setServices: (input:any[]) => void;
  setAggregate: (input:any) => void;
  setDependencyGraph: (input:any) => void;
  setFilter: (input:any) => void;
  setServiceThresholds: (input:any) => void;

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
  serviceThresholds: [
      {
      service: 'test',
      availability_threshold: 1,
      response_time_threshold: 2,
      load_threshold: 3,
      error_threshold: 4 
    }
  ],
  setServices: () => {},
  setAggregate: () => {},
  setDependencyGraph: () => {},
  setFilter:() => {},
  setServiceThresholds: () => {},
};

export const dynamicContext = React.createContext<dynamicState>(liveData)

export const DynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);
  const [aggregate, setAggregate] = useState<any>({});
  const [dependencyGraph, setDependencyGraph ] = useState<any>({});
  const [filter, setFilter] = useState<any>({})
  const [serviceThresholds, setServiceThresholds] = useState<any>([])

return <dynamicContext.Provider value={{services, setServices, aggregate, setAggregate, dependencyGraph, setDependencyGraph, filter, setFilter, serviceThresholds, setServiceThresholds}}>{props.children}</dynamicContext.Provider>

}