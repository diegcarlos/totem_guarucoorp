import Logo from '/assets/images/logo.png';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Glob from 'components/Glob';
import LanguageSelector from 'components/LanguagenSelector';
import { DataProvider } from 'context/DataContext';
import { LanguageProvider } from 'context/LanguageContext';
import React from 'react';
import { Dimensions, Image, Pressable, StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Content from 'screens/Content';
import { default as DataClient } from 'screens/DataClient';
import Home from 'screens/Home';
import OptionsPayment from 'screens/OptionsPayment';
import SearchAddress from 'screens/SearchAddress';

const Stack = createStackNavigator();

const { width } = Dimensions.get('window');

export const Views = () => {
  return (
    <GestureHandlerRootView>
      <DataProvider>
        <LanguageProvider>
          <NavigationContainer>
            <StatusBar hidden />
            <Stack.Navigator
              initialRouteName="home"
              screenOptions={({ navigation }) => {
                return {
                  headerStyle: {
                    height: 120,
                  },
                  headerTitle: () => (
                    <Image
                      style={{ width: 190, height: 120, resizeMode: 'contain' }}
                      source={Logo}
                    />
                  ),
                  headerTransparent: true,
                  headerBackVisible: false,
                  headerTitleAlign: 'center',
                  headerLeft: () => (
                    <Pressable
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: '#f5f6f8',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: 300,
                        padding: 15,
                        marginLeft: 10,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                      }}>
                      <Icon name="chevron-left" color="#000" size={60} />
                    </Pressable>
                  ),
                  headerRight: () => (
                    <View
                      style={{
                        shadowColor: '#171717',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                      }}>
                      <Pressable
                        onPress={() => navigation.navigate('home')}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 100,
                          height: 100,
                          backgroundColor: '#f5f6f8',
                          borderRadius: 300,
                          padding: 15,
                          marginRight: 10,
                        }}>
                        <Icon name="times" size={60} color="#000" />
                      </Pressable>
                    </View>
                  ),
                };
              }}>
              <Stack.Screen
                options={{ headerShown: false }}
                name="home"
                component={Home}
              />
              <Stack.Screen name="content" component={Content} />
              <Stack.Screen name="dataClient" component={DataClient} />
              <Stack.Screen name="optionsPayment" component={OptionsPayment} />
              <Stack.Screen
                name="search-end"
                component={SearchAddress}
                //@ts-ignore
                options={({ navigation }) => {
                  return {
                    headerStyle: {
                      height: 120,
                    },
                    headerTitle: () => (
                      <Image
                        style={{
                          width: 180,
                          height: 120,
                          resizeMode: 'contain',
                        }}
                        source={Logo}
                      />
                    ),
                    headerTransparent: true,
                    headerBackVisible: false,
                    headerTitleAlign: 'center',
                    headerLeft: ({}) => (
                      <View
                        style={{
                          width,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Pressable
                          onPress={() => navigation.goBack()}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            marginLeft: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                          }}>
                          <Icon name="arrow-left" color="#000" size={60} />
                        </Pressable>
                        <LanguageSelector>
                          <Glob fill="#000000" width={75} height={75} />
                        </LanguageSelector>
                      </View>
                    ),
                    headerRight: false,
                  };
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageProvider>
      </DataProvider>
    </GestureHandlerRootView>
  );
};
