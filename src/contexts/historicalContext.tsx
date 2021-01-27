import React, { useState } from 'react'; 

type historicalState = {
    aggregate: {
      status: string,
      load: number,
      response_time: number, 
      error: number,
      availability: number,
    };
    setAggregate: (input:any) => void;
    // setHistorical: (input:any[]) => void;
};

export const historicalData: historicalState = {
  aggregate: {
    status: '',
    load: 0,
    response_time: 0, 
    error: 0,
    availability: 0,
  },
  setAggregate: () => {},
  // setHistorical: () => {}
};

export const historicalContext = React.createContext<historicalState>(historicalData)


export const HistoricalProvider: React.FC = (props: any) => {
  
  const [aggregate, setAggregate] = useState<any>({});

  return <historicalContext.Provider value={{ aggregate, setAggregate}}>{props.children}</historicalContext.Provider>

}