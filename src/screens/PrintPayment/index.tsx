import { ViewRoot } from './styled';

import { onPrintDeviceList } from 'react-native-usb-thermal-printer';

import { apiTaxi } from 'api/apiTaxi';
import { useData } from 'context/DataContext';
import { env } from 'env';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { gerarHash } from '../../util';

export default function PrintPayment() {
  const { dataTransaction, searchTrajeto } = useData();
  const { t } = useTranslation();

  const handlePressListPrint = async () => {
    const devices = await onPrintDeviceList();
    console.log(JSON.stringify(devices, null, 4));
  };

  const handleAddServiceTaxi = async () => {
    try {
      const resp = await apiTaxi.post(
        '/api/booking/add/json',
        {},
        {
          params: {
            user_email: dataTransaction.dataClient.email,
            user_phone: dataTransaction.dataClient.fone,
            user_name: dataTransaction.dataClient.name,
            booking_hash: gerarHash(),
            init_address_name: searchTrajeto.startAddress,
            init_address_lat: env.LAT_DEFAULT,
            init_address_lng: env.LNG_DEFAULT,
          },
        },
      );

      console.log(JSON.stringify(resp.data, null, 2));
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    handleAddServiceTaxi();
  }, [dataTransaction]);

  return (
    <ViewRoot>
      <Text>Pagamento Finalizado</Text>
    </ViewRoot>
  );
}
