import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import * as Screens from '../screen';
import {AppStackParamList, ROUTES} from './routes';

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HOME'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={ROUTES.HOME} component={Screens.Home} />
        <Stack.Screen name={ROUTES.DETAIL} component={Screens.Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
