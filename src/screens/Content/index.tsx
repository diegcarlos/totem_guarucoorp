import { DetailSale } from '@components/DetailSale';
import Glob from '@components/Glob';
import LanguageSelector from '@components/LanguagenSelector';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { MapPolygonProps, Marker, Polyline } from 'react-native-maps';
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { env } from '../../env';
import {
  BackClear,
  Box,
  GroupTextRota,
  GroupViewRota,
  SubBox,
  Text,
  TextRota,
  ViewInitEnd,
  ViewRoot,
  ViewRota,
} from './styled';
import { useKeyboardStatus } from '/hooks/useKeyboardStatus';

import { useTranslation } from 'react-i18next';

import LongPressButton from 'components/LongPressButton';
import { useData } from 'context/DataContext';
import { Dots } from 'screens/SearchAddress/styled';
import { useLogic } from './useLogic';

const latitude = Number(env.LAT_DEFAULT);
const longitude = Number(env.LNG_DEFAULT);

export default function Content({ navigation }: any) {
  const { setSearchTrajeto, searchTrajeto } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const [dataPolyline, setDataPolyline] = useState<
    MapPolygonProps['coordinates']
  >([]);

  const { height } = Dimensions.get('screen');

  const { t } = useTranslation();
  const { defaultHeader, currentHeader } = useLogic();

  const map = useRef<MapView>(null);

  const isKeyboardVisible = useKeyboardStatus();

  const handlePressCancel = () => {
    setSearchTrajeto({
      startAddress: '',
      endAddress: '',
      distance: '',
      duration: '',
      valueDistance: 0,
      valueDuration: 0,
      warning: '',
      summary: '',
      lastSummary: '',
      polygon: [],
      initLatitude: null,
      initLongitude: null,
    });
    setDataPolyline([]);
    navigation.setOptions(defaultHeader);
    setIsOpen(false);
  };

  const defaultMap = () => {
    if (map.current && latitude !== 0 && dataPolyline.length > 0) {
      map.current.fitToCoordinates(
        [
          {
            latitude,
            longitude,
          },
        ],
        {
          animated: true,
          edgePadding: { bottom: 0, left: 0, right: 0, top: 0 },
        },
      );
    }
  };

  useEffect(() => {
    defaultMap();
  }, [map]);

  useEffect(() => {
    if (searchTrajeto.polygon.length > 0) {
      //@ts-ignore
      setDataPolyline(searchTrajeto.polygon);
      setIsOpen(true);
    }
  }, [searchTrajeto]);

  useEffect(() => {
    if (map.current && searchTrajeto?.bounds && dataPolyline.length > 0) {
      const bounds = searchTrajeto?.bounds;
      const northeast = {
        latitude: bounds.northeast.lat,
        longitude: bounds.northeast.lng,
      };
      const southwest = {
        latitude: bounds.southwest.lat,
        longitude: bounds.southwest.lng,
      };
      setTimeout(() => {
        if (map.current) {
          map.current.fitToCoordinates([northeast, southwest], {
            edgePadding: {
              top: 150,
              right: 100,
              bottom: 450,
              left: 100,
            },
          });
        }
      }, 200);
    }
  }, [dataPolyline, map]);

  useEffect(() => {
    if (!isOpen) {
      navigation.setOptions(defaultHeader);
    } else {
      navigation.setOptions(currentHeader);
    }
  }, [isOpen]);

  return (
    <ViewRoot style={{ position: 'relative' }}>
      {isOpen && (
        <ViewInitEnd>
          <BackClear onPress={() => handlePressCancel()}>
            <Icon name="arrow-left" size={33} color="#000" />
          </BackClear>
          <ViewRota onPress={() => navigation.goBack()}>
            <GroupViewRota>
              <GroupTextRota>
                <Dots cor="green" />
                <TextRota ellipsizeMode="tail" numberOfLines={1}>
                  {searchTrajeto?.startAddress}
                </TextRota>
              </GroupTextRota>
              <GroupTextRota>
                <Dots cor="orange" />
                <TextRota ellipsizeMode="tail" numberOfLines={1}>
                  {searchTrajeto?.endAddress}
                </TextRota>
              </GroupTextRota>
            </GroupViewRota>
            <Text>{t('mapSearch.alterar')}</Text>
          </ViewRota>
        </ViewInitEnd>
      )}
      <MapView
        ref={map}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 2.0922,
          longitudeDelta: 2.0421,
        }}>
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
        <Polyline
          coordinates={dataPolyline}
          strokeWidth={7}
          strokeColor="blue"
        />
      </MapView>
      {dataPolyline.length <= 0 && (
        <Box>
          <SubBox
            onPress={() => navigation.push('search-end')}
            margin={
              isKeyboardVisible || isOpen ? height * 0.15 + 'px' : '140%'
            }>
            <View style={{ position: 'absolute', left: 10 }}>
              <LanguageSelector>
                <Glob fill="#ffffff" width={40} height={40} />
              </LanguageSelector>
            </View>

            <Text style={{ color: '#fff', textAlign: 'center' }}>
              {t('mapSearch.placeholder')}
            </Text>

            <LongPressButton
              onPressContinuous={() => navigation.replace('config-default')}
              style={{ position: 'absolute', right: 20 }}>
              <Icon name="search" color="#ffffff" size={36} />
            </LongPressButton>
          </SubBox>
        </Box>
      )}
      {dataPolyline.length > 0 && (
        <DetailSale navigation={navigation} dataLocation={searchTrajeto} />
      )}
    </ViewRoot>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
