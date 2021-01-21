import React, { useState } from 'react'; 

type dynamicState = {
    // declare a historical type of state inside the dynamic state
    // a state type within a state type
  historical: {
    uptime: string,
    latency: number,
    load: string, 
    error: string, // potentially an int TBD.
  }[];
  setHistorical: (input:any[]) => void;
};

export const liveData: dynamicState= {
  historical: [
		{
		uptime: '40 days',
		latency: 20,
		load: 'string1', 
		error: 'string1', 
    },
    {
		uptime: '30 days',
		latency: 10,
		load: 'string', 
		error: 'string', 
	}
],
  setHistorical: () => {}
};

export const historicalContext = React.createContext<dynamicState>(liveData)


export const HistoricalProvider: React.FC = (props: any) => {
  
  const [historical, setHistorical] = useState<any[]>([]);

  return <historicalContext.Provider value={{historical, setHistorical}}>{props.children}</historicalContext.Provider>

}