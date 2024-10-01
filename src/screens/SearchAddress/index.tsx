import axios from 'axios';
import { useLanguage } from 'context/LanguageContext';
import dayjs from 'dayjs';
import { env } from 'env';
import { decode } from 'google-polyline';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'screens/Content/styled';
import { postEstimate } from 'services/Estimate';
import { SearchAddressGoogle } from 'services/SearchAddress';
import {
  BoxInput,
  Dots,
  Input,
  Li,
  LoadingPress,
  RootView,
  ScrollList,
  TextEmpty,
  TextInput,
  TextKms,
  TextLoadingPress,
  TextMain,
  TextSecondary,
  ViewEmpty,
  ViewInput,
  ViewText,
} from './styled';

import { useData } from 'context/DataContext';
import { useTranslation } from 'react-i18next';
import { RootObject } from './root';

const latitude = Number(env.LAT_DEFAULT);
const longitude = Number(env.LNG_DEFAULT);

const { width } = Dimensions.get('window');

export default function SearchAddress({ navigation }: any) {
  const { setSearchTrajeto } = useData();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPress, setLoadingPress] = useState(false);
  const [resultSearch, setResultSearch] = useState<RootObject['predictions']>(
    [],
  );

  const handleChangeAddress = async (input: string) => {
    try {
      setResultSearch([]);
      if (input.length > 3) {
        const searchAddress = await SearchAddressGoogle(
          input,
          `${latitude},${longitude}`,
        );

        setResultSearch(searchAddress);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const handlePressAddress = async (place_id: string) => {
    try {
      setLoadingPress(true);
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
      const destination = `side_of_road:${dest.lat},${dest.lng}`;

      const trajeto = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin,
            destination,
            departure_time: 'now',
            traffic_model: 'pessimistic',
            mode: 'DRIVING',
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
      const routes: any = trajeto.data.routes;

      const estimate = {
        init_lat: latitude,
        init_lng: longitude,
        end_lat: dest.lat,
        end_lng: dest.lng,
        distance: legs.distance.value,
        reference_date: dayjs().format('DD/MM/YYYY HH:mm:SS'),
        ride_duration: legs.duration_in_traffic.value,
        route_type: 'RE',
        encoded_polyline: trajeto.data.routes[0].overview_polyline.points,
      };

      const dataEstimate = await postEstimate(estimate);
      const result = {
        startAddress: legs.start_address,
        endAddress: legs.end_address,
        distance: legs.distance.text,
        valueDistance: dataEstimate?.data.categories[0].estimate || 0,
        duration: legs.duration_in_traffic.text,
        valueDuration: legs.duration_in_traffic.value,
        summary: routes[0].summary,
        lastSummary: routes[routes.length - 1].summary,
        warning: routes[0].warnings.join(', '),
        polygon: decode(trajeto.data.routes[0].overview_polyline.points).map(
          p => {
            return { latitude: p[0], longitude: p[1] };
          },
        ),
        bounds: trajeto.data.routes[0].bounds,
      };
      // @ts-ignore
      setSearchTrajeto({ ...result });
      navigation.push('content');
      setLoadingPress(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes do local:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetch = setTimeout(async () => {
      await handleChangeAddress(search);
      setLoading(false);
    }, 1000);
    return () => {
      setLoading(true);
      clearTimeout(fetch);
    };
  }, [search]);

  return (
    <RootView>
      <BoxInput>
        <ViewInput>
          <TextInput ellipsizeMode="tail" numberOfLines={1}>
            {env.DEFAULT_END}
          </TextInput>
          <Dots absolute cor="green" />
        </ViewInput>
        <ViewInput>
          <Dots absolute cor="orange" />
          <Input
            onChangeText={setSearch}
            placeholder={t('search.placeholder')}
          />
        </ViewInput>
      </BoxInput>
      <ScrollList>
        {loadingPress ? (
          <LoadingPress>
            <TextLoadingPress>Aguarde</TextLoadingPress>
            <ActivityIndicator size="large" />
          </LoadingPress>
        ) : resultSearch.length <= 0 ? (
          loading ? (
            <ViewEmpty>
              <ActivityIndicator size="large" />
            </ViewEmpty>
          ) : (
            <ViewEmpty>
              <Icon name="inbox" size={180} color="#e9e9e9" />
              <TextEmpty>
                {search.length >= 3 ? t('search.notFound') : t('search.empty')}
              </TextEmpty>
            </ViewEmpty>
          )
        ) : (
          <FlatList
            ItemSeparatorComponent={Divider}
            style={{ height: '100%', display: 'flex', width }}
            showsVerticalScrollIndicator={true}
            data={resultSearch}
            renderItem={({ item }) => {
              return (
                <Li onPress={() => handlePressAddress(item.place_id)}>
                  <View
                    style={{
                      backgroundColor: '#bfc3ff',
                      padding: 10,
                      borderRadius: 100,
                      marginLeft: 20,
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="map-marker-alt"
                        size={20}
                        key={item.place_id}
                        color="#313df1"
                      />
                    </View>
                  </View>
                  <ViewText>
                    <TextMain ellipsizeMode="tail" numberOfLines={1}>
                      {item.structured_formatting.main_text}
                    </TextMain>
                    <TextSecondary ellipsizeMode="tail" numberOfLines={1}>
                      {item.structured_formatting.secondary_text}
                    </TextSecondary>
                  </ViewText>
                  <TextKms>
                    {item.distance_meters
                      ? (item.distance_meters / 1000).toFixed(1) + 'km'
                      : '-'}
                  </TextKms>
                </Li>
              );
            }}
          />
        )}
      </ScrollList>
    </RootView>
  );
}
