import Glob from 'components/Glob';
import LanguageSelector from 'components/LanguagenSelector';
import PayMents from 'components/Payment';
import { useData } from 'context/DataContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, Text, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ButtonStep,
  TextButton,
  TextDescription,
  TextInput,
  TextPay,
  TextTotal,
  ViewInput,
  ViewPayContainer,
  ViewPayment,
  ViewRoot,
} from './styled';

const { width, fontScale } = Dimensions.get('screen');

export default function DataClient({ navigation }: any) {
  const [valueInput, setValueInput] = useState('');
  const [formPagamento, setFormPagamento] = useState<string | number>();
  const { searchTrajeto } = useData();
  const [dataClient, setDataClient] = useState({
    name: '',
    email: '',
    fone: '',
  });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [phone, setPhone] = useState('');
  const { t } = useTranslation();
  const TITLES = {
    name: t('dataClient.title.name'),
    email: t('dataClient.title.email'),
    fone: t('dataClient.title.fone'),
    pagamento: t('dataClient.title.pagamento'),
  };

  const labels = [TITLES.name, TITLES.email, TITLES.fone, TITLES.pagamento];
  const descriptionTest: any = {
    0: t('dataClient.description.name'),
    1: t('dataClient.description.email'),
    2: t('dataClient.description.fone'),
  };

  const onPageChange = (position: number, type: 'prev' | 'next') => {
    if (type === 'next') {
      if (handlePressSetValue()) {
        setCurrentPosition(position);
      }
    } else {
      setFormPagamento(undefined);
      setPhone('');
      setCurrentPosition(position);
    }
  };

  const handlePressSetValue = () => {
    if (valueInput.length <= 0 && currentPosition <= 2) {
      const step =
        currentPosition === 0
          ? 'Nome'
          : currentPosition === 1
          ? 'Email'
          : 'Telefone';
      Alert.alert('Ops.', `Favor informar o ${step}`);
      return false;
    }
    if (dataClient.name.length <= 0 && valueInput.length > 0) {
      setDataClient({ ...dataClient, name: valueInput });
    } else if (dataClient.email.length <= 0 && valueInput.length > 0) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(valueInput)) {
        Alert.alert('Ops.', `Favor informar um email valido`);
        return false;
      }
      setDataClient({ ...dataClient, email: valueInput });
    } else if (dataClient.fone.length <= 0 && valueInput.length > 0) {
      setDataClient({ ...dataClient, fone: valueInput });
    } else {
      if (
        ![0, 1, 'd'].includes(formPagamento as any) &&
        currentPosition === 3
      ) {
        Alert.alert('Ops.', `Selecione uma forma de pagamento`);
        return false;
      }
    }

    setValueInput('');
    return true;
  };

  return (
    <ViewRoot style={{ flex: 1 }}>
      <StepIndicator
        stepCount={4}
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        renderStepIndicator={record => {
          return (
            <Icon
              size={20}
              color={
                record.stepStatus === 'finished'
                  ? '#ffffff'
                  : record.stepStatus === 'current'
                  ? '#061f92'
                  : '#aaaaaa'
              }
              name={
                record.position === 0
                  ? 'user-alt'
                  : record.position === 1
                  ? 'envelope'
                  : record.position === 2
                  ? 'phone'
                  : 'credit-card'
              }
            />
          );
        }}
      />
      <View
        style={{
          flex: 1,
          width,
          alignItems: 'center',
          paddingTop: 10,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <TextDescription>{descriptionTest[currentPosition]}</TextDescription>

        {currentPosition === 0 && (
          <ViewInput>
            <TextInput
              onChangeText={setValueInput}
              autoFocus
              placeholder={t('dataClient.input.placeholder')}
            />
          </ViewInput>
        )}
        {currentPosition === 1 && (
          <ViewInput>
            <TextInput
              onChangeText={setValueInput}
              keyboardType="email-address"
              autoFocus
              placeholder={t('dataClient.input.placeholder')}
            />
          </ViewInput>
        )}
        {currentPosition === 2 && (
          <ViewInput>
            <MaskInput
              keyboardType="number-pad"
              mask={mask}
              onChangeText={(masked, unmasked) => {
                setPhone(masked);
                setValueInput(unmasked);
              }}
              value={phone}
              placeholder="(XX) XXXXX-XXXX"
              autoFocus
              style={{ fontSize: 25 }}
            />
          </ViewInput>
        )}
        {currentPosition === 3 && (
          <ViewPayment>
            <View style={{ display: 'flex', alignItems: 'center', width }}>
              <TextPay>Selecione uma forma de pagamento</TextPay>
              <ViewPayContainer>
                <Text>Total: </Text>
                <TextTotal>{searchTrajeto?.valueDistance} R$</TextTotal>
              </ViewPayContainer>
              <PayMents onTypePay={setFormPagamento} />
            </View>
          </ViewPayment>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'row',
          width: width,
          gap: 3,
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <ButtonStep
          disabled={currentPosition === 0}
          onPress={() => onPageChange(currentPosition - 1, 'prev')}>
          <TextButton>{t('dataClient.buttons.prev')}</TextButton>
        </ButtonStep>
        <LanguageSelector>
          <Glob width={80} height={80} />
        </LanguageSelector>
        <ButtonStep
          finish={currentPosition === labels.length - 1}
          onPress={() => {
            currentPosition === 3 ? (
              <></>
            ) : (
              onPageChange(currentPosition + 1, 'next')
            );
          }}>
          {currentPosition === labels.length - 1 ? (
            <TextButton>{t('dataClient.buttons.finish')}</TextButton>
          ) : (
            <TextButton>{t('dataClient.buttons.next')}</TextButton>
          )}
        </ButtonStep>
      </View>
    </ViewRoot>
  );
}

const customStyles = {
  size: 50,
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 60,
  separatorStrokeWidth: 0,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: '#061f92',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#061f92',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#061f92',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#061f92',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#061f92',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: fontScale * 20,
  currentStepLabelColor: '#061f92',
};

const mask = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
