import {IconOutline as Icon} from '@ant-design/icons-react-native';
import {
  Button,
  GroupButtons,
  HeaderOptions,
  ImageBackground,
  TextButton,
  TitleHeaderText,
  ViewRoot,
} from './styled';
import splash from '/assets/images/splashPagamento.jpg';

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, TouchableOpacity} from 'react-native';
import Glob from '/components/Glob';
import LanguageSelector from '/components/LanguagenSelector';

export default function OptionsPayment() {
  const {t} = useTranslation();
  const [selectPayments, setSelectPayments] = useState<{
    payment: null | string;
  }>({payment: null});

  const {height} = Dimensions.get('window');

  const handleClickOptionPayments = (method: string) => {
    setSelectPayments({payment: method});
  };

  return (
    <ViewRoot>
      <HeaderOptions viewTop={height * 0.15}>
        <TouchableOpacity onPress={() => setSelectPayments({payment: null})}>
          <Icon name="close" size={40} />
        </TouchableOpacity>
        <TitleHeaderText>
          {!selectPayments.payment
            ? t('optionsPayment.title')
            : selectPayments.payment === 'DINHEIRO'
            ? 'DINHEIRO'
            : 'CARTÃO'}
        </TitleHeaderText>
        <LanguageSelector>
          <Glob fill="#000" height={80} width={60} />
        </LanguageSelector>
      </HeaderOptions>
      {!selectPayments.payment && (
        <GroupButtons>
          <Button>
            <TextButton onPress={() => handleClickOptionPayments('DINHEIRO')}>
              {t('optionsPayment.method.dinheiro')}
            </TextButton>
          </Button>
          <Button>
            <TextButton onPress={() => handleClickOptionPayments('CARTAO')}>
              {t('optionsPayment.method.card')}
            </TextButton>
          </Button>
        </GroupButtons>
      )}
      {selectPayments.payment === 'CARTAO' && (
        <GroupButtons>
          <Button>
            <TextButton>DEBITO</TextButton>
          </Button>
          <Button>
            <TextButton>CREDITO</TextButton>
          </Button>
        </GroupButtons>
      )}
      <ImageBackground source={splash} />
    </ViewRoot>
  );
}
