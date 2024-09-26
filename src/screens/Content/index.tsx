import {IconOutline as Icon} from '@ant-design/icons-react-native';
import {decode} from 'google-polyline';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import MapView, {MapPolygonProps, Marker, Polyline} from 'react-native-maps';
import 'react-native-reanimated';
import {
  Box,
  Divider,
  SubBox,
  Text,
  TextInput,
  TouchableOpacity,
} from './styled';
import {env} from '/env';

import {DetailSale} from '@components/DetailSale';
import Glob from '@components/Glob';
import LanguageSelector from '@components/LanguagenSelector';
import axios from 'axios';
import {Dimensions} from 'react-native';
import {useKeyboardStatus} from '/hooks/useKeyboardStatus';
import {SearchAddress} from '/services/SearchAddress';

import BottomSheet from 'components/BottomSheet';
import {useTranslation} from 'react-i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useLanguage} from '../../context/LanguageContext';
import {RootObject} from './root';
import {useLogic} from './useLogic';

const latitude = Number(env.LAT_DEFAULT);
const longitude = Number(env.LNG_DEFAULT);

export default function Content({navigation}: any) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLocation, setDataLocation] = useState({
    startAddress: '',
    endAddress: '',
    distance: '',
    valueDistance: 0,
    duration: '',
    valueDuration: 0,
    summary: '',
    warning: '',
  });
  const [resultSearch, setResultSearch] = useState<RootObject['predictions']>(
    [],
  );
  const [dataPolyline, setDataPolyline] = useState<
    MapPolygonProps['coordinates']
  >([]);

  const {height} = Dimensions.get('window');

  const {t} = useTranslation();
  const {defaultHeader} = useLogic();
  const {currentLanguage} = useLanguage();

  const map = useRef<MapView>(null);

  const isKeyboardVisible = useKeyboardStatus();

  const handleChangeAddress = async (input: string) => {
    try {
      setResultSearch([]);
      if (input.length > 3) {
        const searchAddress = await SearchAddress(input);

        setResultSearch(searchAddress);
        setIsOpen(true);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const handlePressAddress = async (place_id: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id,
            key: env.GOOGLE_MAPS_API,
            language:
              currentLanguage === 'pt'
                ? 'pt_BR'
                : currentLanguage === 'en'
                ? 'en'
                : 'es',
            region: 'BR',
          },
        },
      );

      const dest = response.data.result.geometry.location;

      const origin = `${latitude},${longitude}`;
      const destination = `${dest.lat},${dest.lng}`;

      const trajeto = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin,
            destination,
            departure_time: 'now',
            traffic_model: 'best_guess',
            mode: 'driving',
            region: 'BR',
            language:
              currentLanguage === 'pt'
                ? 'pt_BR'
                : currentLanguage === 'en'
                ? 'en'
                : 'es',
            key: env.GOOGLE_MAPS_API,
          },
        },
      );

      const legs: any = trajeto.data.routes[0]?.legs[0];
      const routes: any = trajeto.data.routes[0];
      setDataLocation({
        startAddress: legs.start_address,
        endAddress: legs.end_address,
        distance: legs.distance.text,
        valueDistance: legs.distance.value,
        duration: legs.duration.text,
        valueDuration: legs.duration.value,
        summary: routes.summary,
        warning: routes.warnings.join(', '),
      });

      setDataPolyline(
        decode(trajeto.data.routes[0].overview_polyline.points).map(p => {
          return {latitude: p[0], longitude: p[1]};
        }),
      );

      if (map.current) {
        const bounds = trajeto.data.routes[0].bounds;
        const northeast = {
          latitude: bounds.northeast.lat,
          longitude: bounds.northeast.lng,
        };
        const southwest = {
          latitude: bounds.southwest.lat,
          longitude: bounds.southwest.lng,
        };
        map.current.fitToCoordinates([northeast, southwest], {
          edgePadding: {
            top: 150,
            right: 100,
            bottom: 450,
            left: 100,
          },
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes do local:', error);
      throw error;
    }
  };

  const handlePressCancel = () => {
    setDataLocation({
      startAddress: '',
      endAddress: '',
      distance: '',
      duration: '',
      valueDistance: 0,
      valueDuration: 0,
      warning: '',
      summary: '',
    });
    setDataPolyline([]);
    navigation.setOptions(defaultHeader);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetch = setTimeout(async () => {
      setLoading(false);
      handleChangeAddress(search);
    }, 1000);
    return () => {
      setLoading(true);
      clearTimeout(fetch);
    };
  }, [search]);

  useEffect(() => {
    if (resultSearch.length <= 0) {
      setIsOpen(false);
    }
  }, [resultSearch]);

  useEffect(() => {
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
          edgePadding: {bottom: 0, left: 0, right: 0, top: 0},
        },
      );
    }
  }, [map]);

  return (
    <GestureHandlerRootView>
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
            margin={
              isKeyboardVisible || isOpen ? height * 0.15 + 'px' : '140%'
            }>
            <View style={{position: 'absolute', left: 10}}>
              <LanguageSelector>
                <Glob fill="#ffffff" width={40} height={40} />
              </LanguageSelector>
            </View>

            <TextInput
              onChangeText={text => setSearch(text)}
              placeholder={t('mapSearch.placeholder')}
              placeholderTextColor="#ffffff"
            />
            {!loading ? (
              <Icon
                style={{position: 'absolute', right: 10}}
                name="search"
                color="#ffffff"
                size={36}
              />
            ) : (
              <ActivityIndicator
                style={{position: 'absolute', right: 10}}
                color="#ffffff"
                size={34}
              />
            )}
          </SubBox>
        </Box>
      )}
      {dataPolyline.length > 0 && (
        <DetailSale
          onPressCancel={() => handlePressCancel()}
          onPressConfirm={() => navigation.push('dataClient')}
          dataLocation={dataLocation}
        />
      )}
      <BottomSheet isOpen={isOpen}>
        <FlatList
          ItemSeparatorComponent={Divider}
          style={{height: '100%', display: 'flex'}}
          showsVerticalScrollIndicator={true}
          data={resultSearch}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => handlePressAddress(item.place_id)}>
                  <Icon size={20} key={item.place_id} name="pushpin" />
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
