import {
  TextContent,
  ViewCard,
  ViewContainerCard,
  ViewContent,
  ViewHeader,
  ViewRoot,
} from './styled';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onTypePay?: (data: string | number) => void;
}

export default function PayMents(props: Props) {
  const { onTypePay } = props;
  const [tyPaySelect, setTyPaySelect] = useState(null);
  const { t } = useTranslation();

  const data = [
    {
      key: '1',
      icon: <Icon name="dollar-sign" size={45} />,
      label: t('dataClient.payment.dinheiro'),
      value: 'd',
    },
    {
      key: '2',
      icon: <Icon name="credit-card" size={45} />,
      label: t('dataClient.payment.card-credit'),
      value: 0,
    },
    {
      key: '3',
      icon: <Icon name="credit-card" size={45} />,
      label: t('dataClient.payment.card-debito'),
      value: 1,
    },
  ];

  const handleSelectPay = (value: string | number) => {
    setTyPaySelect(value as any);
    onTypePay?.(value);
  };
  return (
    <ViewRoot>
      <ViewContainerCard>
        {data.map(e => (
          <ViewCard
            key={e.key}
            select={e.value === tyPaySelect}
            onPress={() => handleSelectPay(e.value)}>
            <ViewHeader>
              <TextContent select={e.value === tyPaySelect}>
                {e.icon}
              </TextContent>
            </ViewHeader>
            <ViewContent>
              <TextContent select={e.value === tyPaySelect}>
                {e.label}
              </TextContent>
            </ViewContent>
          </ViewCard>
        ))}
      </ViewContainerCard>
    </ViewRoot>
  );
}
