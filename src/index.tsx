import Logo from '/assets/images/logo.png';

import {IconOutline as Icon} from '@ant-design/icons-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LanguageProvider} from 'context/LanguageContext';
import React from 'react';
import {Image, Pressable, StatusBar, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Content from 'screens/Content';
import {default as DataClient} from 'screens/DataClient';
import Home from 'screens/Home';
import OptionsPayment from 'screens/OptionsPayment';

const Stack = createStackNavigator();

export const Views = () => {
  return (
    <GestureHandlerRootView>
      <LanguageProvider>
        <NavigationContainer>
          <StatusBar hidden />
          <Stack.Navigator
            initialRouteName="home"
            screenOptions={({navigation}: any) => {
              return {
                headerStyle: {
                  height: 120,
                },
                headerTitle: () => (
                  <Image
                    style={{width: 190, height: 120, resizeMode: 'contain'}}
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
                      borderRadius: 300,
                      padding: 15,
                      marginLeft: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                    }}>
                    <Icon name="left" size={60} />
                  </Pressable>
                ),
                headerRight: () => (
                  <View
                    style={{
                      shadowColor: '#171717',
                      shadowOffset: {width: -2, height: 4},
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                    }}>
                    <Pressable
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: '#f5f6f8',
                        borderRadius: 300,
                        padding: 15,
                        marginRight: 10,
                      }}>
                      <Icon name="close" size={60} color="#000" />
                    </Pressable>
                  </View>
                ),
              };
            }}>
            <Stack.Screen
              options={{headerShown: false}}
              name="home"
              component={Home}
            />
            <Stack.Screen name="content" component={Content} />
            <Stack.Screen name="dataClient" component={DataClient} />
            <Stack.Screen name="optionsPayment" component={OptionsPayment} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
};
