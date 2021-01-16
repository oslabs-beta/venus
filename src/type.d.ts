export default interface IUrl {
    id: number;
    name: string;
    description: string;
    status: boolean;
  }
  
  export type ContextType = {
    urls: IUrl[];
    saveUrl: (url: IUrl) => void;
    updateUrl: (id: number) => void;
  };