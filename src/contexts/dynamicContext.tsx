/**
 * @name dynamicContext
 * @desc Component that broadcasts a live stream of data so its subscribers can listen and apply real-time state changes via Context API
 */
import React, { useState } from 'react'; 

type dynamicState = {
  services: { 
    status?: number,
    service: string,
    load: number,
    response_time: number, 
    error: number,
    availability: number,
    key?: number,
    byMethod: any
  }[],
  aggregate: {
    status?: number,
    load: number,
    response_time: number, 
    error: number,
    availability: number,
  };
  dependencyGraph: {
    service: string,
    status: string,
    isExpanded?: boolean,
    children: any[],
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
  serviceNames: any
  setServices: (input:any[]) => void;
  setAggregate: (input:any) => void;
  setDependencyGraph: (input:any) => void;
  setFilter: (input:any) => void;
  setServiceThresholds: (input:any) => void;
  setServiceNames: (input:any) => void
};

export const liveData: dynamicState = {
  services: [
    {
      status: 9,
      service: 'curriculum-api.codesmith.io',
      load: 0,
      response_time: 1266,
      error: 50,
      availability: 100,
      byMethod: {},
    }
  ],
  aggregate: {
    error: 40,
    response_time: 1278,
    load: 2,
    availability: 83,
    status: 0
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
  serviceNames: [],
  setServices: () => {},
  setAggregate: () => {},
  setDependencyGraph: () => {},
  setFilter:() => {},
  setServiceThresholds: () => {},
  setServiceNames: () => {}
};

export const dynamicContext = React.createContext<dynamicState>(liveData)

export const DynamicProvider: React.FC = (props: any) => {
  
  const [services, setServices] = useState<any[]>([]);
  const [aggregate, setAggregate] = useState<any>({});
  const [dependencyGraph, setDependencyGraph ] = useState<any>({});
  const [filter, setFilter] = useState<any>({})
  const [serviceThresholds, setServiceThresholds] = useState<any>([])
  const [serviceNames, setServiceNames] = useState<any>([])

return <dynamicContext.Provider value={{services, setServices, aggregate, setAggregate, dependencyGraph, setDependencyGraph, filter, setFilter, serviceThresholds, setServiceThresholds, serviceNames, setServiceNames}}>{props.children}</dynamicContext.Provider>
}
