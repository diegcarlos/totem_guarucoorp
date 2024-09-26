import {createContext, useContext, useEffect, useState} from 'react';

interface Props {
  currentLanguage: string;
  setCurrentLanguage: (data: string) => void;
}

export const LanguageContext = createContext({} as Props);

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  useEffect(() => {}, []);
  return (
    <LanguageContext.Provider value={{currentLanguage, setCurrentLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
