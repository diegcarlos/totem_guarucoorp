import {IconOutline as Icon} from '@ant-design/icons-react-native';
import {
  Content,
  HeaderOptions,
  ImageBackground,
  TextInput,
  TitleHeaderText,
  ViewBack,
  ViewRoot,
} from './styled';
import splash from '/assets/images/splashPagamento.jpg';

import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  TextInput as BaseTextInput,
  Dimensions,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Glob from '/components/Glob';
import LanguageSelector from '/components/LanguagenSelector';

export default function DataClient({navigation}: any) {
  const {height} = Dimensions.get('window');
  const inputRef = useRef<BaseTextInput>(null);
  const [valueInput, setValueInput] = useState('');
  const [dataClient, setDataClient] = useState({
    name: '',
    email: '',
    fone: '',
  });
  const [step, setStep] = useState<'name' | 'email' | 'fone'>('name');
  const {i18n, t} = useTranslation();
  const {width} = Dimensions.get('window');

  const TITLES = {
    name: t('dataClient.title.name'),
    email: t('dataClient.title.email'),
    fone: t('dataClient.title.fone'),
  };

  const handlePressSetValue = () => {
    if (valueInput.length <= 0) {
      Alert.alert('Ops.', `Favor informar o ${step}`);
      return;
    }
    if (dataClient.name.length <= 0 && valueInput.length > 0) {
      setDataClient({...dataClient, name: valueInput});
      setStep('email');
    } else if (dataClient.email.length <= 0 && valueInput.length > 0) {
      setDataClient({...dataClient, email: valueInput});
      setStep('fone');
    } else if (dataClient.fone.length <= 0 && valueInput.length > 0) {
      setDataClient({...dataClient, fone: valueInput});
      navigation.push('optionsPayment');
    }

    setValueInput('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    ('');

    return inputRef?.current?.focus();
  }, []);
  return (
    <ViewRoot>
      <HeaderOptions viewTop={height * 0.15}>
        <ViewBack></ViewBack>
        <TitleHeaderText>{TITLES[step]}</TitleHeaderText>
        <View style={{position: 'absolute', right: 0}}>
          <LanguageSelector>
            <Glob fill="#000000" height={80} width={60} />
          </LanguageSelector>
        </View>
      </HeaderOptions>
      <Content>
        <TextInput
          ref={inputRef}
          value={valueInput}
          onChangeText={setValueInput}
        />
        <TouchableOpacity
          onPress={handlePressSetValue}
          style={{
            position: 'absolute',
            bottom: 8,
            left: width * 0.4,
          }}>
          <Icon name="check" size={60} color="#000000" />
        </TouchableOpacity>
      </Content>
      <ImageBackground source={splash} />
    </ViewRoot>
  );
}
