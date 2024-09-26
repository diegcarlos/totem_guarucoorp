import {IconOutline as Icon} from '@ant-design/icons-react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  dataLocation: {
    startAddress: string;
    endAddress: string;
    distance: string;
    duration: string;
    valueDistance: number;
    valueDuration: number;
    summary: string;
    warning: string;
  };
  onPressConfirm?: () => void;
  onPressCancel?: () => void;
}

const {width, height} = Dimensions.get('window');

export const DetailSale = (props: Props) => {
  const {dataLocation, onPressConfirm, onPressCancel} = props;
  const [totais, setTotais] = useState({real: 0, dolar: 0});
  const {t} = useTranslation();

  useEffect(() => {
    setTotais({
      real: (dataLocation.valueDistance / 1000) * 1.57,
      dolar: (dataLocation.valueDistance / 1000) * 0.28,
    });
  }, [dataLocation]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        height: '35%',
        backgroundColor: 'transparent',
      }}>
      <View style={styles.groupsInputs}>
        <View style={styles.viewInput}>
          <Text style={styles.textViewInput}>{dataLocation.startAddress}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.textViewInput}>{dataLocation.endAddress}</Text>
        </View>
      </View>

      <View style={styles.resumo}>
        <Icon name="car" size={35} />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={{fontSize: 20}}>{dataLocation.summary}</Text>
          <Text style={{fontSize: 20}}>{dataLocation.warning}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 20, color: 'red'}}>
            {dataLocation.duration}
          </Text>
          <Text style={{fontSize: 20}}>{dataLocation.distance}</Text>
        </View>
      </View>

      <View style={styles.viewTotais}>
        <Text style={styles.total}>R$ {totais.real.toFixed(2)}</Text>
        <Text style={styles.total}>US$ {totais.dolar.toFixed(2)}</Text>
      </View>

      <View style={styles.control}>
        <TouchableOpacity
          onPress={onPressCancel}
          style={{...styles.button, ...styles.buttonRed}}>
          <Text style={styles.text}>{t('mapSearch.buttons.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressConfirm}
          style={{...styles.button, ...styles.buttonBlue}}>
          <Text style={styles.text}>{t('mapSearch.buttons.confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  control: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
  },
  button: {
    backgroundColor: '#021e7e',
    width: '40%',
    display: 'flex',
    alignContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonRed: {backgroundColor: '#ff3131'},
  buttonBlue: {backgroundColor: '#021e7e'},
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  groupsInputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%',
    gap: 12,
    top: 0,
  },
  viewInput: {
    borderWidth: 1,
    width: width - 50,
    height: 53,
    borderRadius: 10,
    borderColor: '#b3b3b3',
    padding: 10,
    backgroundColor: '#fff',
  },
  textViewInput: {
    fontSize: 22,
    fontWeight: '500',
    color: '#b3b3b3',
  },
  resumo: {
    backgroundColor: 'white',
    padding: 10,
    maxWidth: width - 120,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#b3b3b3',
    gap: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 5,
    width: '100%',
  },
  viewTotais: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 150,
    padding: 10,
    marginTop: -17,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b3b3b3',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  total: {
    fontSize: 24,
    fontWeight: '700',
  },
});
