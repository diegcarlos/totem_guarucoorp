import { ViewRoot } from './styled';

import { onPrintDeviceList } from 'react-native-usb-thermal-printer';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';

export default function PrintPayment() {
  const { t } = useTranslation();

  const handlePressListPrint = async () => {
    const devices = await onPrintDeviceList();
    console.log(JSON.stringify(devices, null, 4));
  };

  return (
    <ViewRoot>
      <Button onPress={() => handlePressListPrint()} title="Impressoras" />
      <Text>Pagamento Finalizado</Text>
    </ViewRoot>
  );
}
