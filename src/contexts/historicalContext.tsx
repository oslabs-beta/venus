/**
 * @name historicalContext
 * @desc Context that dynamically updates all historicalData within specific time frame.
 */
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
    serviceData: any;
    timeRange: any;
    currentRange: string;
    setAggregate: (input:any) => void;
    setService: (input:string) => void;
    setServiceData: (input:any) => void;
    setTimeRange: (input:any) => void;
    setCurrentRange: (input:string) => void;
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
  timeRange: {},
  currentRange: '',
  setAggregate: () => {},
  setService: () => {},
  setServiceData: () => {},
  setTimeRange: () => {},
  setCurrentRange: () => {},
};

export const historicalContext = React.createContext<historicalState>(historicalData)


export const HistoricalProvider: React.FC = (props: any) => {
  
  const [ aggregate, setAggregate ] = useState<any>({});
  const [ service, setService ] = useState<any>('')
  const [ serviceData, setServiceData ] = useState<any>({})
  const [ timeRange, setTimeRange ] = useState<any>({})
  const [ currentRange, setCurrentRange ] = useState<any>('lastHour')

  return <historicalContext.Provider value={{ aggregate, setAggregate, service, setService, setServiceData, serviceData, timeRange, setTimeRange, currentRange, setCurrentRange}}>{props.children}</historicalContext.Provider>

}