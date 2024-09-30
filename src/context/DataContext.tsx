import { env } from 'env';
import { createContext, useContext, useEffect, useState } from 'react';
import { MapPolygonProps } from 'react-native-maps';

export interface TypesTrajeto {
  startAddress: string;
  endAddress: string;
  distance: string;
  valueDistance: number | null;
  duration: string;
  valueDuration: number | null;
  summary: string;
  lastSummary: string;
  warning: string;
  polygon: MapPolygonProps['coordinates'][];
  bounds?: any;
}
interface Props {
  searchTrajeto: TypesTrajeto;
  setSearchTrajeto: (data: TypesTrajeto) => void;
}

export const DataContext = createContext({} as Props);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTrajeto, setSearchTrajeto] = useState<TypesTrajeto>({
    startAddress: env.DEFAULT_END,
    endAddress: '',
    distance: '',
    valueDistance: null,
    duration: '',
    valueDuration: null,
    summary: '',
    lastSummary: '',
    warning: '',
    polygon: [],
  });

  useEffect(() => {}, []);
  return (
    <DataContext.Provider value={{ searchTrajeto, setSearchTrajeto }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
