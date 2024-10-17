import { createContext, useContext, useState } from 'react';
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
  initLatitude: number | null;
  initLongitude: number | null;
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

interface TypesTefReturn {
  codAut: string;
  codControle: string;
  codNSU: string;
  dRetorno: string;
  dTransacao: string;
  financiamento: string;
  idTef: string;
  modPagamento: number;
  numCartao: string;
  qtdParcelas: number;
  rede: string;
  retTexto: string;
  tpConfirmacao: number;
  tpPagamento: string;
  vPagamento: number;
  arqRetorno?: string;
  viaCliente?: string;
  viaEstabelecimento?: string;
}

interface TypesTransaction {
  dataClient: { name: string; email: string; fone: string };
  dataTransaction: TypesTefReturn;
}
interface Props {
  searchTrajeto: TypesTrajeto;
  setSearchTrajeto: (data: TypesTrajeto) => void;
  dataTransaction: TypesTransaction;
  setDataTransaction: (data: TypesTransaction) => void;
  handleSitefPag: (
    tipoPag: 0 | 1 | 'd',
    value: string,
  ) => Promise<TypesTefReturn | undefined>;
}

const { SitefPag } = NativeModules;

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
    initLatitude: null,
    initLongitude: null,
  });

  const [dataTransaction, setDataTransaction] = useState<TypesTransaction>(
    {} as TypesTransaction,
  );

  const handleSitefPag = async (
    tipoPag: 0 | 1 | 'd',
    value: string,
  ): Promise<TypesTefReturn | undefined> => {
    try {
      let pagar;
      if (typeof tipoPag === 'number') {
        pagar = await SitefPag.pagar(tipoPag, 1, value);
      } else {
        pagar = 'Dinheiro';
      }
      const dados: TypesTefReturn = JSON.parse(pagar);
      delete dados.arqRetorno;
      delete dados.viaCliente;
      delete dados.viaEstabelecimento;

      return dados;
    } catch (error) {
      Alert.alert('Erro', `Transação cancelada: ${error}`);
    }
  };
  return (
    <DataContext.Provider
      value={{
        searchTrajeto,
        setSearchTrajeto,
        handleSitefPag,
        dataTransaction,
        setDataTransaction,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
