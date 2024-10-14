import { createContext, useContext, useEffect, useState } from 'react';
import { Alert, NativeModules } from 'react-native';
import { MapPolygonProps } from 'react-native-maps';
import { env } from '../env';

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

// const response = await SitefPag.configurarSitef(
//   '192.168.3.3;192.168.3.3:20036', // ipTEF
//   '09517945000150', // cnpj
//   'SE000001', // terminalTef
//   '00000000', // cnpjAutomacao
//   '00000000', // empresaSitef
//   0, // comExterior (kotlin.Int)
//   '0', // otp
//   '', // nomeIntegracao
// );

export interface TypesConfigApp {
  ipTEF: string; // ipTEF
  cnpg: string; // cnpj
  terminalTef: string; // terminalTef
  cnpjAutomacao: string; // cnpjAutomacao
  empresaSitef: string; // empresaSitef
  conExterior: number; // comExterior (kotlin.Int)
  otp: string; // otp
  nomeIntegração: string; // nomeIntegracao
}
interface Props {
  searchTrajeto: TypesTrajeto;
  setSearchTrajeto: (data: TypesTrajeto) => void;
  handleSitefPag: (tipoPag: 0 | 1 | 'd', value: string) => void;
}

const { SitefPag } = NativeModules;

export const DataContext = createContext({} as Props);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [configApp, setConfigApp] = useState<TypesConfigApp>(
    {} as TypesConfigApp,
  );
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

  const handleSitefPag = async (tipoPag: 0 | 1 | 'd', value: string) => {
    try {
      let pagar;
      if (typeof tipoPag === 'number') {
        pagar = await SitefPag.pagar(tipoPag, 1, value);
      } else {
        pagar = 'Dinheiro';
      }

      return pagar;
    } catch (error) {
      Alert.alert('Erro', `Transação cancelada: ${error}`);
    }
  };

  useEffect(() => {
    if (!configApp) {
    }
  }, []);
  return (
    <DataContext.Provider
      value={{ searchTrajeto, setSearchTrajeto, handleSitefPag }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
