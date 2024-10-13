import AsyncStorage from '@react-native-async-storage/async-storage';
import { Select } from 'components/Select';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, NativeModules, SafeAreaView, TextInput } from 'react-native';
import {
  onPrintCut,
  onPrintDeviceList,
  onPrintText,
} from 'react-native-usb-thermal-printer';
import { Button, InputConfig, Text, View, ViewFlex } from './styled';
interface TypesUsb {
  product_name?: string;
  product_id: number;
  vendor_id: number;
  manufacturer_name?: string;
  device_id: number;
  device_name: string;
}

const { SitefPag } = NativeModules;
export default function ConfigLocationDefault() {
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      ipTef: '',
      cnpj: '',
      terminalTef: '',
      cnpjAutomacao: '',
      empresaSitef: '',
      comExterior: 0,
      otp: '',
      nomeIntegracao: '',
      defaultImp: 0,
    },
  });

  const [pass, setPass] = useState('');
  const [dataUsb, setDataUsb] = useState<TypesUsb[]>([]);

  const handleEditConfig = async () => {
    const resp = await AsyncStorage.getItem('config-default');

    if (resp) {
      const dados = JSON.parse(resp);
      Object.entries(dados).forEach(([key, value]: any) => {
        setValue(key, value);
      });
    }
  };

  const onFinish = async (data: any) => {
    try {
      const value = JSON.stringify(data);
      await AsyncStorage.setItem('config-default', value);

      const location = await AsyncStorage.getItem('config-default');

      if (location !== null) {
        Alert.alert('Sucesso', 'Configurações salva com sucesso', [
          { text: 'Fechar' },
        ]);

        SitefPag.configurarSitef(
          data.ipTef,
          data.cnpj,
          data.terminalTef,
          data.cnpjAutomacao,
          data.empresaSitef,
          Number(data.comExterior),
          data.otp,
          data.nomeIntegracao,
        );
      }
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error), [{ text: 'Fechar' }]);
    }
  };

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

  const handlePressListPrint = async () => {
    const devices = await onPrintDeviceList();
    handleEditConfig();
    setDataUsb(devices.filter((f: any) => f.product_name !== null));
  };

  const handlePrint = async () => {
    try {
      const usb = Number(watch('defaultImp'));
      await onPrintText(usb, 'TESTE DE IMPRESSÃO \n\n\n\n\n');
      await onPrintCut(usb, true, false);
    } catch (error: any) {
      Alert.alert('Erro', error?.message);
    }
  };

  useEffect(() => {
    handlePressListPrint();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {pass === 'masterPass' ? (
          <>
            <ViewFlex>
              <InputConfig name="ipTef" control={control} label="Ip Tef" />
              <InputConfig name="cnpj" control={control} label="CNPJ" />
            </ViewFlex>
            <ViewFlex>
              <InputConfig
                name="terminalTef"
                control={control}
                label="Terminal TEF"
              />
              <InputConfig
                name="cnpjAutomcao"
                control={control}
                label="CNPJ Automação"
              />
            </ViewFlex>

            <ViewFlex>
              <InputConfig
                name="empresaSitef"
                control={control}
                label="Empresa Sitef"
              />
              <InputConfig
                name="comExterior"
                keyboardType="number-pad"
                control={control}
                label="COM Exterior"
              />
            </ViewFlex>
            <ViewFlex style={{ marginBottom: 15 }}>
              <InputConfig name="otp" control={control} label="OTP" />
              <InputConfig
                name="nomeIntegracao"
                control={control}
                label="Nome da Integração"
              />
            </ViewFlex>
            <ViewFlex style={{ width: 600 }}>
              <Select
                label="Impressora padrão"
                control={control}
                name="defaultImp"
                labelStyle={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 2,
                }}
                placeholder="Selecione a usb referente a impressora"
                options={dataUsb.map(e => {
                  return {
                    label: `${e.manufacturer_name} ${e.product_name}`,
                    value: e.product_id,
                  };
                })}
                primaryColor={'blue'}
              />
            </ViewFlex>
            <Button onPress={() => handlePrint()}>
              <Text style={{ color: '#fff' }}>Testar impressora</Text>
            </Button>
            <Button style={{ marginTop: 15 }} onPress={handleSubmit(onFinish)}>
              <Text style={{ color: '#fff' }}>Salvar</Text>
            </Button>
          </>
        ) : (
          <TextInput
            style={{
              borderStyle: 'solid',
              width: 300,
              borderRadius: 15,
              borderColor: '#000',
              borderWidth: 1,
              height: 50,
              textAlign: 'center',
            }}
            passwordRules=""
            secureTextEntry
            placeholder="Senha para alterar configurações"
            onChangeText={setPass}
            value={pass}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
