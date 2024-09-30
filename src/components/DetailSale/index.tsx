import Glob from 'components/Glob';
import LanguageSelector from 'components/LanguagenSelector';
import { TypesTrajeto } from 'context/DataContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ConfirmPress,
  Container,
  DataContent,
  KmsTimeView,
  Lang,
  TextConfirm,
  TextKms,
  TextMain,
  TextTime,
  TextTotal,
  TextWng,
  Trajeto,
} from './styled';
import Logo from '/assets/images/logo.png';

interface Props {
  dataLocation: TypesTrajeto;
  onConfirm?: () => void;
}

export const DetailSale = (props: Props) => {
  const { dataLocation, onConfirm } = props;
  const { t } = useTranslation();
  return (
    <Container>
      <Lang>
        <LanguageSelector>
          <Glob fill="#000" width={60} height={60} />
        </LanguageSelector>
      </Lang>
      <Card>
        <CardHeader>
          <CardTitle>{t('mapSearch.card.title')}</CardTitle>
        </CardHeader>
        <CardContent cor="blue">
          <DataContent>
            <Icon name="car" size={30} />
            <Trajeto>
              <TextMain>{dataLocation?.summary}</TextMain>
              <TextWng>{dataLocation?.warning}</TextWng>
            </Trajeto>
            <KmsTimeView>
              <TextTime>{dataLocation?.duration}</TextTime>
              <TextKms>{dataLocation?.distance}</TextKms>
            </KmsTimeView>
          </DataContent>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('mapSearch.card.valor')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            style={{ width: 190, height: 120, resizeMode: 'contain' }}
            source={Logo}
          />
          <TextTotal>{dataLocation?.valueDistance}R$</TextTotal>
          <TextTotal>
            {dataLocation.valueDistance &&
              (dataLocation?.valueDistance / 5.44).toFixed(2)}
            US$
          </TextTotal>
          <ConfirmPress>
            <TextConfirm onPress={onConfirm}>
              {t('mapSearch.buttons.confirm')}
            </TextConfirm>
          </ConfirmPress>
        </CardContent>
      </Card>
    </Container>
  );
};
