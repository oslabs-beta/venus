import React, { useState } from 'react'; 

type historicalState = {
    aggregate: {
      status: string,
      load: number,
      response_time: number, 
      error: number,
      availability: number,
    };
    service:string;
    serviceData: any
    setAggregate: (input:any) => void;
    setService: (input:string) => void;
    setServiceData: (input:any) => void;
};

export const historicalData: historicalState = {
  aggregate: {
    status: '',
    load: 0,
    response_time: 0, 
    error: 0,
    availability: 0,
  },
  service: '',
  serviceData: {},
  setAggregate: () => {},
  setService: () => {},
  setServiceData: () => {}
};

export const historicalContext = React.createContext<historicalState>(historicalData)


export const HistoricalProvider: React.FC = (props: any) => {
  
  const [aggregate, setAggregate] = useState<any>({});
  const [ service, setService] = useState<any>('')
  const [ serviceData, setServiceData ] = useState<any>({})

  return <historicalContext.Provider value={{ aggregate, setAggregate, service, setService, setServiceData, serviceData}}>{props.children}</historicalContext.Provider>

}