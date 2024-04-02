import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { AppProvider } from './src/contexts/AppContext';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0099FF" barStyle="light-content"/>
      <AppProvider>
        <Routes/>
      </AppProvider>
    </NavigationContainer>
  );
}
